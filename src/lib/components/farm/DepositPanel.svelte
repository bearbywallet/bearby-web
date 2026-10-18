<script lang="ts">
	import * as m from '$lib/paraglide/messages';
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
		WBTC,
		WBTC_DECIMALS,
		XAUT,
		XAUT_DECIMALS,
		buildApproveCalldata,
		buildDepositCalldata,
		formatAmount,
		fromWei,
		parseAmount,
		planDeposit,
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

	let amountWbtc = $state('');
	let amountXaut = $state('');
	let status = $state<TxStatus>('idle');
	let approveToken = $state('');
	let txHash = $state<string | null>(null);
	let failure = $state<string | null>(null);

	let wbtcBalance = $derived(
		user?.wbtcBalance ? fromWei(BigInt(user.wbtcBalance), WBTC_DECIMALS) : 0
	);
	let xautBalance = $derived(
		user?.xautBalance ? fromWei(BigInt(user.xautBalance), XAUT_DECIMALS) : 0
	);
	let wbtcAmount = $derived(parseAmount(amountWbtc));
	let xautAmount = $derived(parseAmount(amountXaut));
	let plan = $derived(planDeposit(wbtcAmount, xautAmount, stats));
	let vault = $derived(stats?.vaultAddress ?? null);
	let overBalance = $derived(wbtcAmount > wbtcBalance || xautAmount > xautBalance);
	let busy = $derived(status === 'approve' || status === 'pending' || status === 'mining');
	let disabled = $derived(busy || overBalance || (wbtcAmount === 0 && xautAmount === 0));
	let expectedShares = $derived(
		plan.expectedSharesWei > 0n
			? formatAmount(fromWei(plan.expectedSharesWei, ABLP_DECIMALS), 4)
			: '—'
	);

	function needsApprove(allowance: string | null, amountWei: bigint): boolean {
		if (amountWei === 0n) return false;
		if (allowance === null) return true;
		return BigInt(allowance) < amountWei;
	}

	let actionLabel = $derived.by(() => {
		if (!wallet.connected) return m.farm_connect_wallet();
		if (status === 'approve') return m.farm_approve({ token: approveToken });
		if (status === 'pending') return m.farm_pending_wallet();
		if (status === 'mining') return m.farm_mining();
		return m.farm_deposit_btn();
	});

	async function submit(): Promise<void> {
		if (!wallet.connected) {
			onconnect();
			return;
		}
		if (!vault) return;
		failure = null;
		txHash = null;
		try {
			await ensureChain(CHAIN_ID);

			if (needsApprove(user?.wbtcAllowance ?? null, plan.amount0Wei)) {
				approveToken = m.farm_token_wbtc();
				status = 'approve';
				await waitForTx(await sendTx(buildApproveCalldata(WBTC, vault, plan.amount0Wei)));
			}
			if (needsApprove(user?.xautAllowance ?? null, plan.amount1Wei)) {
				approveToken = m.farm_token_xaut();
				status = 'approve';
				await waitForTx(await sendTx(buildApproveCalldata(XAUT, vault, plan.amount1Wei)));
			}

			status = 'pending';
			const hash = await sendTx(buildDepositCalldata(vault, wbtcAmount, xautAmount, stats));
			txHash = hash;
			status = 'mining';
			await waitForTx(hash);

			status = 'done';
			amountWbtc = '';
			amountXaut = '';
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

<section class="farm-card deposit">
	<header class="head">
		<h2 class="farm-panel-title">{m.farm_deposit_title()}</h2>
		<p class="note">{m.farm_strategy_note()}</p>
	</header>

	<div class="fields">
		<div class="field">
			<div class="field-top">
				<span class="token">
					<span class="glyph btc" aria-hidden="true">₿</span>
					<span class="token-name">{m.farm_token_wbtc()}</span>
				</span>
				<button class="max" type="button" onclick={() => (amountWbtc = String(wbtcBalance))}>
					{m.farm_max()}
				</button>
			</div>
			<input
				class="input farm-num"
				type="text"
				inputmode="decimal"
				autocomplete="off"
				placeholder="0.0"
				bind:value={amountWbtc}
				aria-label={m.farm_token_wbtc()}
			/>
			<p class="balance">
				{m.farm_balance({ balance: `${formatAmount(wbtcBalance, 6)} WBTC` })}
			</p>
		</div>

		<div class="field">
			<div class="field-top">
				<span class="token">
					<span class="glyph xaut" aria-hidden="true">Au</span>
					<span class="token-name">{m.farm_token_xaut()}</span>
				</span>
				<button class="max" type="button" onclick={() => (amountXaut = String(xautBalance))}>
					{m.farm_max()}
				</button>
			</div>
			<input
				class="input farm-num"
				type="text"
				inputmode="decimal"
				autocomplete="off"
				placeholder="0.0"
				bind:value={amountXaut}
				aria-label={m.farm_token_xaut()}
			/>
			<p class="balance">
				{m.farm_balance({ balance: `${formatAmount(xautBalance, 4)} XAUT` })}
			</p>
		</div>
	</div>

	<p class="expected farm-num">{m.farm_expected_shares({ shares: expectedShares })}</p>

	{#if overBalance}
		<p class="warn" role="status">
			{m.farm_balance({
				balance: `${formatAmount(wbtcBalance, 6)} WBTC / ${formatAmount(xautBalance, 4)} XAUT`
			})}
		</p>
	{/if}

	<Button variant="primary" class="farm-action" onclick={submit} {disabled}>
		{actionLabel}
	</Button>

	<TxFeedback {status} {approveToken} hash={txHash} message={failure} />

	<footer class="notes">
		<p>{m.farm_min_deposit_note()}</p>
		<p>{m.farm_slippage_note()}</p>
	</footer>
</section>

<style>
	.deposit {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.note {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 13px;
		color: var(--text-muted);
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 10px;
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

	.token {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.glyph {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		font-family: var(--font-primary);
		font-size: 12px;
		color: #fff;
	}

	.glyph.btc {
		background: linear-gradient(135deg, #f7931a, #e2761b);
	}

	.glyph.xaut {
		background: linear-gradient(135deg, var(--brand-purple), var(--brand-pink));
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

	.balance {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 12px;
		color: var(--text-muted);
	}

	.expected {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 13px;
		color: var(--text-secondary);
	}

	.warn {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 12px;
		color: var(--brand-pink);
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
</style>
