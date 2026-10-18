<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { Eip6963ProviderDetail } from '$lib/web3/eip6963';
	import { connect, wallet } from '$lib/web3/wallet.svelte';

	const BEARBY_PATTERN = /bearby/i;

	let {
		open,
		onselect,
		onclose
	}: {
		open: boolean;
		onselect: (detail: Eip6963ProviderDetail) => void;
		onclose: () => void;
	} = $props();

	let panel = $state<HTMLDivElement | null>(null);

	$effect(() => {
		if (!open) return;
		const timer = setTimeout(() => panel?.querySelector<HTMLElement>('button')?.focus(), 30);
		return () => clearTimeout(timer);
	});

	function handleKey(event: KeyboardEvent): void {
		if (event.key === 'Escape' && open) onclose();
	}

	async function pick(detail: Eip6963ProviderDetail): Promise<void> {
		try {
			await connect(detail);
			onselect(detail);
		} catch {
			// The store records the failure; the modal stays open for a retry.
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

{#if open}
	<div class="overlay">
		<button class="scrim" type="button" aria-label={m.farm_close()} onclick={onclose}></button>

		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="farm-wallet-title"
			bind:this={panel}
		>
			<h2 id="farm-wallet-title" class="farm-panel-title">{m.farm_connect_wallet()}</h2>

			{#if wallet.providers.length === 0}
				<p class="empty">{m.farm_no_wallet()}</p>
			{:else}
				<p class="hint">{m.farm_continue_with()}</p>
				<ul class="list">
					{#each wallet.providers as detail (detail.info.rdns)}
						{@const isBearby = BEARBY_PATTERN.test(detail.info.rdns + detail.info.name)}
						<li>
							<button class="option" type="button" onclick={() => pick(detail)}>
								{#if detail.info.icon}
									<img class="icon" src={detail.info.icon} alt="" width="28" height="28" />
								{:else}
									<span class="icon fallback" aria-hidden="true"></span>
								{/if}
								<span class="name">{detail.info.name}</span>
								{#if isBearby}
									<span class="badge">Bearby</span>
								{/if}
							</button>
						</li>
					{/each}
				</ul>
			{/if}

			{#if wallet.error === 'rejected'}
				<p class="error" role="status">{m.farm_tx_rejected()}</p>
			{:else if wallet.error === 'failed'}
				<p class="error" role="status">{m.farm_tx_failed()}</p>
			{/if}

			<button class="close" type="button" onclick={onclose}>{m.farm_close()}</button>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
	}

	.scrim {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.72);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border: 0;
		cursor: pointer;
	}

	.modal {
		position: relative;
		width: min(420px, 100%);
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-xl);
		padding: 28px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6);
	}

	.hint,
	.empty {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 14px;
		color: var(--text-secondary);
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.option {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		border-radius: var(--border-radius-md);
		border: 1px solid var(--border-color);
		background: var(--bg-subtle);
		color: var(--text-primary);
		font-family: var(--font-secondary);
		font-size: 15px;
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			background 0.2s ease;
	}

	.option:hover,
	.option:focus-visible {
		background: var(--bg-card-hover);
		border-color: var(--border-hover);
	}

	.icon {
		border-radius: 8px;
		flex-shrink: 0;
	}

	.icon.fallback {
		width: 28px;
		height: 28px;
		background: linear-gradient(135deg, var(--brand-purple), var(--brand-pink));
	}

	.name {
		flex: 1;
		text-align: left;
	}

	.badge {
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 4px 10px;
		border-radius: 40px;
		color: var(--brand-green);
		border: 1px solid color-mix(in srgb, var(--brand-green) 40%, transparent);
		background: color-mix(in srgb, var(--brand-green) 10%, transparent);
	}

	.error {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 14px;
		color: var(--brand-pink);
	}

	.close {
		align-self: flex-end;
		background: none;
		border: 0;
		padding: 4px 0;
		color: var(--text-muted);
		font-family: var(--font-secondary);
		font-size: 13px;
		cursor: pointer;
	}

	.close:hover {
		color: var(--text-secondary);
	}
</style>
