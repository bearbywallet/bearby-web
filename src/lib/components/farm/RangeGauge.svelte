<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { formatAmount, priceAtTick, type FarmStats } from '$lib/web3/farm';

	let { stats }: { stats: FarmStats | null } = $props();

	const NOT_AVAILABLE = '—';

	let lower = $derived(stats?.tickLower ?? null);
	let upper = $derived(stats?.tickUpper ?? null);
	let currentTick = $derived(stats?.currentTick ?? null);
	let inRange = $derived(stats?.inRange ?? null);

	/** Where the price sits between the range boundaries, clamped to the bar. */
	let markerPercent = $derived.by(() => {
		if (lower === null || upper === null || currentTick === null || upper <= lower) return 50;
		const ratio = ((currentTick - lower) / (upper - lower)) * 100;
		return Math.min(100, Math.max(0, ratio));
	});

	let lowerPrice = $derived(lower === null ? NOT_AVAILABLE : formatAmount(priceAtTick(lower), 2));
	let upperPrice = $derived(upper === null ? NOT_AVAILABLE : formatAmount(priceAtTick(upper), 2));
	let currentPrice = $derived(
		stats?.priceXautPerBtc === null || stats?.priceXautPerBtc === undefined
			? NOT_AVAILABLE
			: formatAmount(stats.priceXautPerBtc, 2)
	);
	let decision = $derived(stats?.bot?.decision ?? null);
</script>

<section class="gauge farm-card">
	<header class="head">
		<div>
			<p class="farm-label">{m.farm_range_status()}</p>
			<p class="prices farm-num">
				<span>{lowerPrice}</span>
				<span class="arrow" aria-hidden="true">→</span>
				<span>{upperPrice}</span>
				<span class="unit">XAUT / WBTC</span>
			</p>
		</div>

		<div class="chips">
			{#if inRange !== null}
				<span class={['chip', { ok: inRange, out: !inRange }]}>
					{inRange ? m.farm_in_range() : m.farm_out_of_range()}
				</span>
			{/if}
			{#if decision}
				<span class="chip ghost">{m.farm_keeper_decision()}: {decision}</span>
			{/if}
		</div>
	</header>

	<div
		class="track"
		role="img"
		aria-label={`${m.farm_current_price()}: ${currentPrice} XAUT / WBTC`}
	>
		<div class="bar"></div>
		<div class={['marker', { out: inRange === false }]} style={`left: ${markerPercent}%`}></div>
	</div>

	<footer class="foot">
		<span class="farm-label">{m.farm_current_price()}</span>
		<span class="now farm-num">{currentPrice} XAUT / WBTC</span>
	</footer>
</section>

<style>
	.gauge {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}

	.prices {
		margin: 6px 0 0;
		display: flex;
		align-items: baseline;
		gap: 8px;
		font-family: var(--font-primary);
		font-size: 22px;
		color: var(--text-primary);
	}

	.arrow {
		color: var(--text-muted);
	}

	.unit {
		font-family: var(--font-secondary);
		font-size: 12px;
		color: var(--text-muted);
		letter-spacing: 0.04em;
	}

	.chips {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.chip {
		padding: 6px 14px;
		border-radius: 40px;
		font-family: var(--font-secondary);
		font-size: 12px;
		border: 1px solid var(--border-color);
		color: var(--text-secondary);
		background: var(--bg-subtle);
	}

	.chip.ok {
		color: var(--brand-green);
		border-color: color-mix(in srgb, var(--brand-green) 40%, transparent);
		background: color-mix(in srgb, var(--brand-green) 10%, transparent);
	}

	.chip.out {
		color: var(--brand-pink);
		border-color: color-mix(in srgb, var(--brand-pink) 40%, transparent);
		background: color-mix(in srgb, var(--brand-pink) 10%, transparent);
	}

	.chip.ghost {
		color: var(--text-muted);
	}

	.track {
		position: relative;
		height: 10px;
		margin: 8px 18px;
	}

	.bar {
		position: absolute;
		inset: 0;
		border-radius: 40px;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--brand-purple) 60%, transparent) 0%,
			color-mix(in srgb, var(--brand-green) 55%, transparent) 100%
		);
		box-shadow: inset 0 0 0 1px var(--border-color);
	}

	.marker {
		position: absolute;
		top: 50%;
		width: 16px;
		height: 16px;
		margin-left: -8px;
		border-radius: 50%;
		transform: translateY(-50%);
		background: #fff;
		box-shadow:
			0 0 0 4px rgba(255, 255, 255, 0.12),
			0 0 24px var(--brand-green);
		transition: left 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		animation: pulse 2.8s ease-in-out infinite;
	}

	.marker.out {
		box-shadow:
			0 0 0 4px rgba(255, 255, 255, 0.12),
			0 0 24px var(--brand-pink);
	}

	@keyframes pulse {
		0%,
		100% {
			box-shadow:
				0 0 0 4px rgba(255, 255, 255, 0.1),
				0 0 18px var(--brand-green);
		}
		50% {
			box-shadow:
				0 0 0 7px rgba(255, 255, 255, 0.06),
				0 0 30px var(--brand-green);
		}
	}

	.foot {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}

	.now {
		font-family: var(--font-primary);
		font-size: 18px;
		color: var(--text-primary);
	}

	@media (prefers-reduced-motion: reduce) {
		.marker {
			animation: none;
			transition: none;
		}
	}
</style>
