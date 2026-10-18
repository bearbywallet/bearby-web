<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Button from '$lib/components/ui/Button.svelte';
	import { disconnect, ensureChain, wallet } from '$lib/web3/wallet.svelte';
	import { CHAIN_ID, EXPLORER } from '$lib/web3/farm';

	let { onopen }: { onopen: () => void } = $props();

	let switching = $state(false);

	let connected = $derived(wallet.connected);
	let wrongNetwork = $derived(connected !== null && connected.chainId !== CHAIN_ID);
	let shortAddress = $derived(
		connected ? `${connected.address.slice(0, 6)}…${connected.address.slice(-4)}` : ''
	);

	async function switchNetwork(): Promise<void> {
		switching = true;
		try {
			await ensureChain(CHAIN_ID);
		} catch {
			// Wallet declined the switch; the badge stays visible.
		} finally {
			switching = false;
		}
	}
</script>

<div class="wallet">
	{#if wrongNetwork}
		<button class="network-badge" type="button" onclick={switchNetwork} disabled={switching}>
			<span class="dot" aria-hidden="true"></span>
			{switching ? m.farm_switch_network() : m.farm_wrong_network()}
		</button>
	{/if}

	{#if connected}
		<a
			class="chip"
			href={`${EXPLORER}/address/${connected.address}`}
			target="_blank"
			rel="noopener noreferrer"
			title={connected.info.name}
		>
			{#if connected.info.icon}
				<img class="chip-icon" src={connected.info.icon} alt="" width="20" height="20" />
			{:else}
				<span class="chip-dot" aria-hidden="true"></span>
			{/if}
			<span class="chip-address farm-num">{shortAddress}</span>
		</a>
		<Button variant="outline" onclick={() => disconnect()}>
			{m.farm_disconnect()}
		</Button>
	{:else}
		<Button variant="primary" onclick={onopen} disabled={wallet.connecting}>
			{wallet.connecting ? m.farm_pending_wallet() : m.farm_connect_wallet()}
		</Button>
	{/if}
</div>

<style>
	.wallet {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.network-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		border-radius: 40px;
		border: 1px solid color-mix(in srgb, var(--brand-pink) 45%, transparent);
		background: color-mix(in srgb, var(--brand-pink) 12%, transparent);
		color: var(--brand-pink);
		font-family: var(--font-secondary);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.network-badge:hover:not(:disabled) {
		background: color-mix(in srgb, var(--brand-pink) 20%, transparent);
	}

	.network-badge:disabled {
		cursor: progress;
		opacity: 0.8;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--brand-pink);
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 10px 18px;
		border-radius: 40px;
		background: var(--bg-subtle);
		border: 1px solid var(--border-color);
		color: var(--text-primary);
		text-decoration: none;
		font-family: var(--font-secondary);
		font-size: 14px;
		transition: border-color 0.2s ease;
	}

	.chip:hover {
		border-color: var(--border-hover);
	}

	.chip-icon {
		border-radius: 50%;
	}

	.chip-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--brand-green);
		box-shadow: 0 0 12px var(--brand-green);
	}

	.chip-address {
		letter-spacing: 0.01em;
	}
</style>
