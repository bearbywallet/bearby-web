<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import WalletButton from '$lib/components/farm/WalletButton.svelte';
	import WalletModal from '$lib/components/farm/WalletModal.svelte';
	import RangeGauge from '$lib/components/farm/RangeGauge.svelte';
	import StatGrid from '$lib/components/farm/StatGrid.svelte';
	import DepositPanel from '$lib/components/farm/DepositPanel.svelte';
	import PositionPanel from '$lib/components/farm/PositionPanel.svelte';
	import '$lib/components/farm/farm.css';
	import { initWallet, wallet } from '$lib/web3/wallet.svelte';
	import {
		EXPLORER,
		POOL,
		VAULT_ADDRESS,
		loadUserData,
		parseStats,
		type FarmStats,
		type UserFarmData
	} from '$lib/web3/farm';

	const STATS_INTERVAL_MS = 30_000;
	const USER_INTERVAL_MS = 15_000;

	let stats = $state<FarmStats | null>(null);
	let user = $state<UserFarmData | null>(null);
	let loading = $state(true);
	let modalOpen = $state(false);

	let configured = $derived(stats?.configured ?? VAULT_ADDRESS !== null);
	let vault = $derived(stats?.vaultAddress ?? VAULT_ADDRESS);

	async function loadStats(): Promise<void> {
		try {
			const response = await fetch('/farm/api/stats', { cache: 'no-store' });
			if (!response.ok) return;
			const parsed = parseStats(await response.json());
			if (parsed) stats = parsed;
		} catch {
			// Keep the previous snapshot; the next poll retries.
		} finally {
			loading = false;
		}
	}

	async function refreshAll(): Promise<void> {
		await loadStats();
		const address = wallet.connected?.address;
		if (address && vault) user = await loadUserData(address, vault);
	}

	$effect(() => initWallet());

	$effect(() => {
		loadStats();
		const timer = setInterval(loadStats, STATS_INTERVAL_MS);
		return () => clearInterval(timer);
	});

	$effect(() => {
		const address = wallet.connected?.address ?? null;
		const vaultAddress = vault;
		if (!address) {
			user = null;
			return;
		}
		let cancelled = false;
		const refresh = async () => {
			const next = await loadUserData(address, vaultAddress);
			if (!cancelled) user = next;
		};
		refresh();
		const timer = setInterval(refresh, USER_INTERVAL_MS);
		return () => {
			cancelled = true;
			clearInterval(timer);
		};
	});

	function closeModal(): void {
		modalOpen = false;
	}
</script>

<svelte:head>
	<title>Bearby Farm — AutoBase</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="glow" aria-hidden="true"></div>

<main class="page">
	<header class="top">
		<p class="lockup">
			<span class="brand">Bearby</span>
			<span class="cross" aria-hidden="true">⨯</span>
			<span class="brand alt">AutoBase</span>
		</p>
		<WalletButton onopen={() => (modalOpen = true)} />
	</header>

	<section class="hero">
		<h1 class="title">{m.farm_title()}</h1>
		<p class="tagline">{m.farm_tagline()}</p>

		{#if configured}
			<p class="links">
				{#if vault}
					<a href={`${EXPLORER}/token/${vault}`} target="_blank" rel="noopener noreferrer">
						ABLP
					</a>
				{/if}
				<a href={`${EXPLORER}/address/${POOL}`} target="_blank" rel="noopener noreferrer">
					{`${m.farm_token_wbtc()} / ${m.farm_token_xaut()}`}
				</a>
				<a
					href={`https://app.uniswap.org/explore/pools/ethereum/${POOL}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					Uniswap
				</a>
			</p>
		{/if}
	</section>

	{#if !configured}
		<section class="farm-card soon">
			<p class="soon-text">{m.farm_coming_soon()}</p>
		</section>
	{:else}
		<RangeGauge {stats} />
		<StatGrid {stats} {loading} />

		<div class="panels">
			<DepositPanel {stats} {user} onconnect={() => (modalOpen = true)} onrefresh={refreshAll} />
			<PositionPanel {stats} {user} onconnect={() => (modalOpen = true)} onrefresh={refreshAll} />
		</div>
	{/if}

	<footer class="foot">
		<p>{m.farm_strategy_note()}</p>
	</footer>
</main>

<WalletModal open={modalOpen} onselect={closeModal} onclose={closeModal} />

<style>
	.glow {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		background:
			radial-gradient(
				60% 45% at 50% 0%,
				color-mix(in srgb, var(--brand-purple) 16%, transparent) 0%,
				transparent 70%
			),
			radial-gradient(
				45% 40% at 92% 88%,
				color-mix(in srgb, var(--brand-green) 9%, transparent) 0%,
				transparent 70%
			);
	}

	.page {
		position: relative;
		z-index: 1;
		max-width: var(--section-max-width);
		margin: 0 auto;
		padding: 40px 24px 80px;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}

	.lockup {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-primary);
		font-size: 15px;
		letter-spacing: 0.01em;
	}

	.brand {
		color: var(--text-primary);
	}

	.brand.alt {
		color: var(--text-secondary);
	}

	.cross {
		color: var(--brand-purple);
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 8px 0 0;
	}

	.title {
		margin: 0;
		font-family: var(--font-primary);
		font-size: var(--text-h2);
		line-height: var(--line-height-title);
		letter-spacing: -0.02em;
		color: var(--text-primary);
		background-image: linear-gradient(
			270deg,
			var(--brand-purple) 0%,
			var(--brand-pink) 55%,
			var(--text-primary) 110%
		);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.tagline {
		margin: 0;
		max-width: 620px;
		font-family: var(--font-secondary);
		font-size: 16px;
		line-height: var(--line-height-body);
		color: var(--text-secondary);
	}

	.links {
		margin: 0;
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		font-family: var(--font-secondary);
		font-size: 13px;
	}

	.links a {
		color: var(--text-muted);
		text-decoration: none;
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 1px;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.links a:hover {
		color: var(--text-primary);
		border-color: var(--border-hover);
	}

	.panels {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		align-items: start;
	}

	.soon {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 220px;
		text-align: center;
	}

	.soon-text {
		margin: 0;
		font-family: var(--font-primary);
		font-size: 20px;
		color: var(--text-secondary);
		max-width: 420px;
	}

	.foot {
		padding-top: 8px;
		border-top: 1px solid var(--border-color);
	}

	.foot p {
		margin: 12px 0 0;
		font-family: var(--font-secondary);
		font-size: 13px;
		color: var(--text-muted);
	}

	@media (max-width: 809.98px) {
		.page {
			padding: 24px 16px 56px;
			gap: 20px;
		}

		.panels {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
