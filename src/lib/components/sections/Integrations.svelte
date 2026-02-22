<script lang="ts">
	import { chains } from '$lib/data/integrations';
	import Card from '$lib/components/ui/Card.svelte';

	const getChainIcon = (name: string) => {
		switch (name) {
			case 'Ethereum':
				return '/img/chain-ethereum.svg';
			case 'Binance Chain':
				return '/img/chain-bnb.svg';
			case 'Polygon':
				return '/img/chain-polygon.svg';
			case 'Arbitrum':
				return '/img/chain-arbitrum.svg';
			case 'Optimism':
				return '/img/chain-optimism.svg';
			case 'Base':
				return '/img/chain-base.svg';
			case 'Avalanche':
				return '/img/chain-avalanche.svg';
			case 'Linea':
				return '/img/chain-linea.svg';
			default:
				return '';
		}
	};
</script>

<section class="integrations">
	<div class="container">
		<Card class="integrations-card">
			<div class="integrations-inner">
				<div class="integrations-text">
					<h2 class="integrations-title">Seamless Integrations for a Smarter Workflow</h2>
					<p class="integrations-body">
						Bearby works effortlessly with your favorite tools, making your workflow smoother and
						more efficient. Connect, automate, and get things done faster!
					</p>
				</div>

				<div class="integrations-grid">
					{#each chains as chain (chain.name)}
						<div class="chain-item">
							<img src={getChainIcon(chain.name)} alt={chain.name} class="chain-icon" />
							<span class="chain-name">{chain.name}</span>
						</div>
					{/each}
				</div>
			</div>
		</Card>
	</div>
</section>

<style>
	.integrations {
		padding: 24px 0;
	}

	:global(.integrations-card) {
		padding: 64px !important;
	}

	.integrations-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		align-items: center;
	}

	.integrations-text {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.integrations-title {
		font-size: clamp(2rem, 4vw, 2.5rem);
		font-weight: 500;
		color: var(--text-primary);
		line-height: 1.2;
	}

	.integrations-body {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.integrations-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.chain-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 24px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 40px;
		transition: all 0.2s;
	}

	.chain-item:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--border-hover);
	}

	.chain-icon {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.chain-name {
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	@media (max-width: 900px) {
		.integrations-inner {
			grid-template-columns: 1fr;
			gap: 48px;
		}
		:global(.integrations-card) {
			padding: 32px !important;
		}
		.integrations-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
