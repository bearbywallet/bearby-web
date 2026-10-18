<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { EXPLORER } from '$lib/web3/farm';
	import type { TxStatus } from './status';

	let {
		status,
		approveToken = '',
		hash = null,
		message = null
	}: {
		status: TxStatus;
		approveToken?: string;
		hash?: string | null;
		message?: string | null;
	} = $props();

	let label = $derived.by(() => {
		switch (status) {
			case 'approve':
				return m.farm_approve({ token: approveToken });
			case 'pending':
				return m.farm_pending_wallet();
			case 'mining':
				return m.farm_mining();
			case 'done':
				return m.farm_success();
			case 'error':
				return message ?? m.farm_tx_failed();
			default:
				return '';
		}
	});
</script>

<div class="feedback" aria-live="polite">
	{#if status !== 'idle'}
		<p class={['line', { ok: status === 'done', bad: status === 'error' }]}>
			<span class="text">{label}</span>
			{#if hash}
				<a class="link" href={`${EXPLORER}/tx/${hash}`} target="_blank" rel="noopener noreferrer">
					{m.farm_view_explorer()}
				</a>
			{/if}
		</p>
	{/if}
</div>

<style>
	.feedback {
		min-height: 0;
	}

	.line {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
		font-family: var(--font-secondary);
		font-size: 13px;
		color: var(--text-secondary);
	}

	.line.ok {
		color: var(--brand-green);
	}

	.line.bad {
		color: var(--brand-pink);
	}

	.text {
		overflow-wrap: anywhere;
	}

	.link {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 3px;
		opacity: 0.85;
	}

	.link:hover {
		opacity: 1;
	}
</style>
