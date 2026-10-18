<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { formatAmount, type FarmStats } from '$lib/web3/farm';

	let { stats, loading }: { stats: FarmStats | null; loading: boolean } = $props();

	let now = $state(Date.now());

	$effect(() => {
		const timer = setInterval(() => (now = Date.now()), 60_000);
		return () => clearInterval(timer);
	});

	const NOT_AVAILABLE = '—';

	function relativeTime(unixSeconds: number | null, currentMs: number): string {
		if (unixSeconds === null) return NOT_AVAILABLE;
		const deltaSeconds = Math.round((unixSeconds * 1000 - currentMs) / 1000);
		const magnitude = Math.abs(deltaSeconds);
		const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
		if (magnitude < 60) return formatter.format(deltaSeconds, 'second');
		if (magnitude < 3600) return formatter.format(Math.round(deltaSeconds / 60), 'minute');
		if (magnitude < 86_400) return formatter.format(Math.round(deltaSeconds / 3600), 'hour');
		return formatter.format(Math.round(deltaSeconds / 86_400), 'day');
	}

	function percent(value: number | null): string {
		if (value === null || !Number.isFinite(value)) return NOT_AVAILABLE;
		return `${formatAmount(value, 1)}%`;
	}

	let supply = $derived(
		stats?.totalSupply ? formatAmount(Number(stats.totalSupply) / 1e18, 2) : NOT_AVAILABLE
	);
	let lastRebalance = $derived(relativeTime(stats?.lastRebalance ?? null, now));
	let lastRebalanceAbsolute = $derived.by(() => {
		const seconds = stats?.lastRebalance ?? null;
		if (seconds === null || seconds <= 0) return NOT_AVAILABLE;
		return new Date(seconds * 1000).toLocaleString();
	});
	let bot = $derived(stats?.bot ?? null);
</script>

<section class="grid" aria-busy={loading}>
	<article class="farm-card stat">
		<p class="farm-label">{m.farm_tvl()}</p>
		{#if loading}
			<span class="skeleton"></span>
		{:else}
			<p class="value farm-num">
				{stats?.tvlXaut === null || stats?.tvlXaut === undefined
					? NOT_AVAILABLE
					: formatAmount(stats.tvlXaut, 4)}
				<span class="unit">XAUT</span>
			</p>
			<p class="sub farm-num">
				≈ {stats?.tvlWbtc === null || stats?.tvlWbtc === undefined
					? NOT_AVAILABLE
					: formatAmount(stats.tvlWbtc, 4)} WBTC
			</p>
		{/if}
	</article>

	<article class="farm-card stat">
		<p class="farm-label">{m.farm_share_price()}</p>
		{#if loading}
			<span class="skeleton"></span>
		{:else}
			<p class="value farm-num">
				{stats?.sharePriceXaut === null || stats?.sharePriceXaut === undefined
					? NOT_AVAILABLE
					: formatAmount(stats.sharePriceXaut, 4)}
				<span class="unit">XAUT</span>
			</p>
			<p class="sub">
				{m.farm_ablp_supply()}: <span class="farm-num">{supply}</span>
			</p>
		{/if}
	</article>

	<article class="farm-card stat">
		<p class="farm-label">{m.farm_fee_apr()}</p>
		{#if loading}
			<span class="skeleton"></span>
		{:else}
			<p class="value farm-num accent">{percent(bot?.feeApr ?? null)}</p>
			<p class="sub farm-num">
				{bot?.feesValue1 === null || bot?.feesValue1 === undefined
					? NOT_AVAILABLE
					: formatAmount(bot.feesValue1, 2)} XAUT fees
			</p>
		{/if}
	</article>

	<article class="farm-card stat">
		<p class="farm-label">{m.farm_time_in_range()}</p>
		{#if loading}
			<span class="skeleton"></span>
		{:else}
			<p class="value farm-num">{percent(bot?.timeInRange ?? null)}</p>
			<p class="sub">
				{stats?.paused === null || stats?.paused === undefined
					? NOT_AVAILABLE
					: stats.paused
						? m.farm_status_paused()
						: m.farm_status_active()}
			</p>
		{/if}
	</article>

	<article class="farm-card stat">
		<p class="farm-label">{m.farm_volatility()}</p>
		{#if loading}
			<span class="skeleton"></span>
		{:else}
			<p class="value farm-num">{percent(bot?.sigmaDaily ?? null)}</p>
			<p class="sub">
				{m.farm_keeper_decision()}: <span class="farm-num">{bot?.decision ?? NOT_AVAILABLE}</span>
			</p>
		{/if}
	</article>

	<article class="farm-card stat">
		<p class="farm-label">{m.farm_last_rebalance()}</p>
		{#if loading}
			<span class="skeleton"></span>
		{:else}
			<p class="value">{lastRebalance}</p>
			<p class="sub farm-num">{lastRebalanceAbsolute}</p>
		{/if}
	</article>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.stat {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-height: 132px;
	}

	.value {
		margin: 0;
		font-family: var(--font-primary);
		font-size: 28px;
		line-height: 1.15;
		color: var(--text-primary);
		font-variant-numeric: tabular-nums;
	}

	.value.accent {
		color: var(--brand-green);
	}

	.unit {
		font-size: 14px;
		color: var(--text-secondary);
		margin-left: 4px;
	}

	.sub {
		margin: 0;
		font-family: var(--font-secondary);
		font-size: 13px;
		color: var(--text-muted);
	}

	.skeleton {
		display: block;
		width: 70%;
		height: 30px;
		border-radius: 8px;
		background: linear-gradient(
			90deg,
			var(--bg-subtle) 0%,
			rgba(255, 255, 255, 0.08) 50%,
			var(--bg-subtle) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.6s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@media (max-width: 1199.98px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 809.98px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton {
			animation: none;
		}
	}
</style>
