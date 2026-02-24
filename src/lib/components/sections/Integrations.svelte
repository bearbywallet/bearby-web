<script lang="ts">
	import { chains } from '$lib/data/integrations';
	import Card from '$lib/components/ui/Card.svelte';

	const col1 = chains.slice(0, 4);
	const col2 = chains.slice(4);

	const icons: Record<string, string> = {
		Ethereum: '/img/chain-ethereum.svg',
		'Binance Chain': '/img/chain-bnb.svg',
		Polygon: '/img/chain-polygon.svg',
		Arbitrum: '/img/chain-arbitrum.svg',
		Optimism: '/img/chain-optimism.svg',
		Base: '/img/chain-base.svg',
		Avalanche: '/img/chain-avalanche.svg',
		Linea: '/img/chain-linea.svg'
	};
</script>

<section class="integrations" id="integrations">
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

				<div class="integrations-columns">
					<div class="ticker-col">
						<ul class="ticker-list ticker-up">
							{#each [...col1, ...col1] as chain, i (i)}
								<li class="chain-card">
									<img src={icons[chain.name]} alt={chain.name} class="chain-icon" />
									<span class="chain-name">{chain.name}</span>
								</li>
							{/each}
						</ul>
					</div>

					<div class="ticker-col">
						<ul class="ticker-list ticker-down">
							{#each [...col2, ...col2] as chain, i (i)}
								<li class="chain-card">
									<img src={icons[chain.name]} alt={chain.name} class="chain-icon" />
									<span class="chain-name">{chain.name}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</Card>
	</div>
</section>

<style>
	.integrations {
		padding: 8px 0 0;
	}

	:global(.integrations-card) {
		padding: 48px !important;
		border-radius: 48px !important;
	}

	.integrations-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
	}

	.integrations-text {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.integrations-title {
		font-family: var(--font-primary);
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		font-weight: 500;
		color: var(--text-primary);
		line-height: 1.15;
	}

	.integrations-body {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Right side: two scrolling columns */
	.integrations-columns {
		display: flex;
		gap: 10px;
		height: 380px;
	}

	.ticker-col {
		flex: 1;
		overflow: hidden;
		mask-image: linear-gradient(
			rgba(0, 0, 0, 0) 0%,
			rgb(0, 0, 0) 15%,
			rgb(0, 0, 0) 85%,
			rgba(0, 0, 0, 0) 100%
		);
		-webkit-mask-image: linear-gradient(
			rgba(0, 0, 0, 0) 0%,
			rgb(0, 0, 0) 15%,
			rgb(0, 0, 0) 85%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.ticker-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		list-style: none;
		margin: 0;
		padding: 0;
		will-change: transform;
	}

	.ticker-up {
		animation: scrollUp 11s linear infinite;
	}

	.ticker-down {
		animation: scrollDown 11s linear infinite;
	}

	@keyframes scrollUp {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-50%);
		}
	}

	@keyframes scrollDown {
		from {
			transform: translateY(-50%);
		}
		to {
			transform: translateY(0);
		}
	}

	/* Individual chain card */
	.chain-card {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 18px 20px;
		background: var(--gray-950);
		border: 1px solid var(--gray-900);
		border-radius: 19px;
		height: 84px;
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.chain-icon {
		width: 44px;
		height: 44px;
		object-fit: contain;
		border-radius: 10px;
		flex-shrink: 0;
	}

	.chain-name {
		font-family: var(--font-secondary);
		font-size: 1rem;
		font-weight: 500;
		color: var(--gray-300);
		white-space: nowrap;
	}

	@media (max-width: 900px) {
		.integrations-inner {
			grid-template-columns: 1fr;
			gap: 32px;
		}

		:global(.integrations-card) {
			padding: 32px !important;
		}

		.integrations-columns {
			height: 300px;
		}
	}
</style>
