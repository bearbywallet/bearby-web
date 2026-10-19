<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import Button from '$lib/components/ui/Button.svelte';
	import TxFeedback from './TxFeedback.svelte';
	import type { TxStatus } from './status';
	import {
		errorCode,
		errorMessage,
		ensureChain,
		sendTx,
		waitForTx,
		wallet
	} from '$lib/web3/wallet.svelte';
	import {
		ABLP_DECIMALS,
		CHAIN_ID,
		WBTC_DECIMALS,
		XAUT_DECIMALS,
		buildWithdrawCalldata,
		formatAmount,
		formatFiat,
		fromWei,
		parseAmount,
		planWithdraw,
		type FarmStats,
		type UserFarmData
	} from '$lib/web3/farm';

	let {
		stats,
		user,
		onconnect,
		onrefresh
	}: {
		stats: FarmStats | null;
		user: UserFarmData | null;
		onconnect: () => void;
		onrefresh: () => Promise<void> | void;
	} = $props();

	const NOT_AVAILABLE = '—';
	const PRESETS = [25, 50, 75, 100];

	let percentInput = $state('');
	let status = $state<TxStatus>('idle');
	let txHash = $state<string | null>(null);
	let failure = $state<string | null>(null);
	let now = $state(Math.floor(Date.now() / 1000));

	$effect(() => {
		const timer = setInterval(() => (now = Math.floor(Date.now() / 1000)), 1000);
		return () => clearInterval(timer);
	});

	let balanceWei = $derived(user?.ablpBalance ? BigInt(user.ablpBalance) : 0n);
	let sharesBalance = $derived(fromWei(balanceWei, ABLP_DECIMALS));
	let sharePrice = $derived(stats?.sharePriceXaut ?? null);
	let myValue = $derived(sharePrice === null ? null : sharesBalance * sharePrice);
	let myValueFiat = $derived(stats?.fiat ? formatFiat(myValue, stats.fiat, getLocale()) : null);
	let lockedUntil = $derived(user?.lockedUntil ?? null);
	let locked = $derived(lockedUntil !== null && lockedUntil > now);
	let vault = $derived(stats?.vaultAddress ?? null);
	// ABLP has 18 decimals but ~1e12 share-wei per XAUT, so raw share counts are unreadable
	// (≈1e-6 ABLP per XAUT). Users pick a percent; shares are derived exactly in bigint, and
	// 100% is the exact on-chain balance so a full exit leaves no dust.
	let percent = $derived(parseAmount(percentInput));
	let sharesWei = $derived(
		percent >= 100 ? balanceWei : (balanceWei * BigInt(Math.floor(percent * 100))) / 10000n
	);
	let plan = $derived(sharesWei > 0n ? planWithdraw(sharesWei, stats) : null);
	let busy = $derived(status === 'pending' || status === 'mining');
	let disabled = $derived(busy || locked || sharesWei === 0n || percent > 100 || vault === null);

	let countdown = $derived.by(() => {
		if (!locked || lockedUntil === null) return '';
		const remaining = Math.max(0, lockedUntil - now);
		const minutes = Math.floor(remaining / 60);
		const seconds = remaining % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	});

	let actionLabel = $derived.by(() => {
		if (!wallet.connected) return m.farm_connect_wallet();
		if (status === 'pending') return m.farm_pending_wallet();
		if (status === 'mining') return m.farm_mining();
		return m.farm_withdraw_btn();
	});

	async function submit(): Promise<void> {
		if (!wallet.connected) {
			onconnect();
			return;
		}
		if (!vault) return;
		const call = buildWithdrawCalldata(vault, sharesWei, stats);
		if (!call) {
			status = 'error';
			failure = m.farm_tx_failed();
			return;
		}
		failure = null;
		txHash = null;
		try {
			await ensureChain(CHAIN_ID);
			status = 'pending';
			const hash = await sendTx(call);
			txHash = hash;
			status = 'mining';
			await waitForTx(hash);
			status = 'done';
			percentInput = '';
			await onrefresh();
		} catch (error) {
			status = 'error';
			failure =
				errorCode(error) === 4001
					? m.farm_tx_rejected()
					: `${m.farm_tx_failed()} — ${errorMessage(error).slice(0, 120)}`;
		}
	}
</script>

<section class="farm-card position">
	<header class="head">
		<h2 class="farm-panel-title">{m.farm_withdraw_title()}</h2>
		{#if stats?.paused}
			<span class="paused">{m.farm_status_paused()}</span>
		{/if}
	</header>

	<div class="summary">
		<div>
			<p class="farm-label">{m.farm_my_value()}</p>
			<p class="value farm-num">
				{myValue === null ? NOT_AVAILABLE : formatAmount(myValue, 4)}
				<span class="unit">XAUT</span>
			</p>
			{#if myValueFiat}
				<p class="fiat farm-num">≈ {myValueFiat}</p>
			{/if}
		</div>
	</div>

	{#if locked}
		<p class="lock" role="status">
			{m.farm_locked_until({ time: countdown })}
		</p>
	{/if}

	<div class="field">
		<div class="field-top">
			<span class="token-name">{m.farm_withdraw_amount()}</span>
			<div class="presets">
				{#each PRESETS as preset (preset)}
					<button class="max" type="button" onclick={() => (percentInput = String(preset))}>
						{preset === 100 ? m.farm_max() : `${preset}%`}
					</button>
				{/each}
			</div>
		</div>
		<div class="input-row">
			<input
				class="input farm-num"
				type="text"
				inputmode="decimal"
				autocomplete="off"
				placeholder="0"
				bind:value={percentInput}
				aria-label={m.farm_withdraw_amount()}
			/>
			<span class="suffix farm-num">%</span>
		</div>
	</div>

	<p class="expected farm-num">
		{m.farm_expected_out({
			wbtc: plan ? formatAmount(fromWei(plan.expected0Wei, WBTC_DECIMALS), 6) : NOT_AVAILABLE,
			xaut: plan ? formatAmount(fromWei(plan.expected1Wei, XAUT_DECIMALS), 4) : NOT_AVAILABLE
		})}
	</p>

	<Button variant="primary" class="farm-action" onclick={submit} {disabled}>
		{actionLabel}
	</Button>

	<TxFeedback {status} hash={txHash} message={failure} />

	<footer class="notes">
		<p>{m.farm_slippage_note()}</p>
	</footer>
</section>

<style>
	.position {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.paused {
		padding: 4px 12px;
		border-radius: 40px;
		font-family: var(--font-secondary);
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--brand-pink);
		border: 1px solid color-mix(in srgb, var(--brand-pink) 40%, transparent);
	}

	.summary {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.value {
		margin: 4px 0 0;
		font-family: var(--font-primary);
		font-size: 22px;
		color: var(--text-primary);
		font-variant-numeric: tabular-nums;
	}

	.fiat {
		margin: 4px 0 0;
		font-family: var(--font-secondary);
		font-size: 13px;
		color: var(--text-muted);
	}

	.unit {
		font-family: var(--font-secondary);
		font-size: 12px;
		color: var(--text-muted);
	}

	.lock {
		margin: 0;
		padding: 10px 14px;
		border-radius: var(--border-radius-md);
		border: 1px solid color-mix(in srgb, var(--brand-pink) 30%, transparent);
		background: color-mix(in srgb, var(--brand-pink) 8%, transparent);
		color: var(--brand-pink);
		font-family: var(--font-secondary);
		font-size: 13px;
		font-variant-numeric: tabular-nums;
	}

	.field {
		border: 1px solid var(--border-color);
		background: var(--bg-subtle);
		border-radius: var(--border-radius-md);
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		transition: border-color 0.2s ease;
	}

	.field:focus-within {
		border-color: color-mix(in srgb, var(--brand-purple) 60%, transparent);
	}

	.field-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.token-name {
		font-family: var(--font-secondary);
		font-size: 14px;
		color: var(--text-secondary);
	}

	.max {
		background: none;
		border: 0;
		padding: 2px 6px;
		border-radius: 6px;
		color: var(--brand-purple);
		font-family: var(--font-secondary);
		font-size: 11px;
		letter-spacing: 0.06em;
		cursor: pointer;
	}

	.presets {
		display: flex;
		gap: 4px;
	}

	.input-row {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.suffix {
		font-family: var(--font-primary);
		font-size: 26px;
		color: var(--text-muted);
	}

	.max:hover {
		background: var(--bg-card-hover);
	}

	.input {
		width: 100%;
		background: transparent;
		border: 0;
		outline: none;
		color: var(--text-primary);
		font-family: var(--font-primary);
		font-size: 26px;
		padding: 0;
	}

	.input::placeholder {
		color: var(--text-muted);
	}

	.expected {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 13px;
		color: var(--text-secondary);
	}

	.notes {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.notes p {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 12px;
		color: var(--text-muted);
	}

	@media (max-width: 809.98px) {
		.summary {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
