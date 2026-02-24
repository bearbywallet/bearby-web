<script lang="ts">
	import type { Action } from 'svelte/action';
	import { getChains } from '$lib/data/integrations';
	import * as m from '$lib/paraglide/messages';
	import Card from '$lib/components/ui/Card.svelte';

	const chains = getChains();
	const col1 = chains.slice(0, 4);
	const col2 = chains.slice(4);

	const icons: Record<string, string> = {
		ethereum: '/img/chain-ethereum.svg',
		bnb: '/img/chain-bnb.svg',
		polygon: '/img/chain-polygon.svg',
		arbitrum: '/img/chain-arbitrum.svg',
		optimism: '/img/chain-optimism.svg',
		base: '/img/chain-base.svg',
		avalanche: '/img/chain-avalanche.svg',
		linea: '/img/chain-linea.svg'
	};

	const pauseWhenHidden: Action<HTMLElement> = (node) => {
		const observer = new IntersectionObserver(
			([entry]) => {
				node.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
			},
			{ threshold: 0 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	};
</script>

<section class="integrations" id="integrations">
	<div class="container">
		<Card class="integrations-card">
			<div class="integrations-inner">
				<div class="integrations-text">
					<h2 class="integrations-title">{m.integrations_title()}</h2>
					<p class="integrations-body">
						{m.integrations_desc()}
					</p>
				</div>

				<div class="integrations-columns">
					<div class="ticker-col">
						<ul class="ticker-list ticker-up" use:pauseWhenHidden>
							{#each [...col1, ...col1] as chain, i (i)}
								<li class="chain-card">
									<img src={icons[chain.key]} alt={chain.name} class="chain-icon" loading="lazy" width="44" height="44" />
									<span class="chain-name">{chain.name}</span>
								</li>
							{/each}
						</ul>
					</div>

					<div class="ticker-col">
						<ul class="ticker-list ticker-down" use:pauseWhenHidden>
							{#each [...col2, ...col2] as chain, i (i)}
								<li class="chain-card">
									<img src={icons[chain.key]} alt={chain.name} class="chain-icon" loading="lazy" width="44" height="44" />
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
		border-radius: var(--card-radius) !important;
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

	.integrations-columns {
		display: flex;
		gap: 10px;
		height: 380px;
	}

	.ticker-col {
		flex: 1;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(transparent 0%, #000 15%, #000 85%, transparent 100%);
		mask-image: linear-gradient(transparent 0%, #000 15%, #000 85%, transparent 100%);
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

	.chain-card {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 18px 20px;
		background: var(--bg-card);
		border: 1px solid var(--border-card);
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
		color: var(--text-primary);
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
