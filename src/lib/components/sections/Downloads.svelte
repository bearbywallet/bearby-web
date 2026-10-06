<script lang="ts">
	import { getDownloads, type Download } from '$lib/data/downloads';
	import { dlIcons } from '$lib/assets/icons';
	import * as m from '$lib/paraglide/messages';
	import { slide, fly } from 'svelte/transition';

	const downloads = getDownloads();

	let expanded = $state(false);

	const primaryDownloads = downloads.filter((d) => !d.secondary);
	const secondaryDownloads = downloads.filter((d) => d.secondary);

	const getIcon = (platform: string) => dlIcons[platform] ?? { src: '', lazy: true };
</script>

{#snippet dlCardContent(dl: Download)}
	{@const icon = getIcon(dl.platform)}
	<div class="dl-inner">
		<div class="dl-icon-wrap">
			<img
				src={icon.src}
				alt={dl.label}
				class="dl-icon"
				loading={icon.lazy ? 'lazy' : 'eager'}
				width="80"
				height="80"
			/>
		</div>
		<div class="dl-texts">
			<h4 class="dl-title">{dl.label}</h4>
			<p class="dl-count">{dl.count}</p>
		</div>
	</div>
	<div class="dl-btn">
		{dl.action}
	</div>
{/snippet}

<section id="downloads" class="downloads-section">
	<div class="container">
		<header class="dl-header">
			<span class="dl-badge">{m.dl_badge()}</span>
			<h2 class="dl-heading">{m.dl_title()}</h2>
			<p class="dl-subtitle">{m.dl_subtitle()}</p>
		</header>
		{#each [primaryDownloads.slice(0, 3), primaryDownloads.slice(3)].filter((row) => row.length > 0) as row, idx (idx)}
			<div class="downloads-row">
				{#each row as dl (dl.platform)}
					<a href={dl.href} class="dl-card" target="_blank" rel="noopener noreferrer">
						{@render dlCardContent(dl)}
					</a>
				{/each}
			</div>
		{/each}
		{#if expanded}
			<div class="downloads-row secondary" transition:slide={{ duration: 400 }}>
				{#each secondaryDownloads as dl, i (dl.platform)}
					<a
						href={dl.href}
						class="dl-card"
						target="_blank"
						rel="noopener noreferrer"
						in:fly={{ y: 30, duration: 300, delay: i * 80 }}
					>
						{@render dlCardContent(dl)}
					</a>
				{/each}
			</div>
		{/if}
		{#if secondaryDownloads.length > 0}
			<button class="expand-btn" onclick={() => (expanded = !expanded)}>
				<span class="expand-text">{expanded ? m.dl_show_less() : m.dl_show_more()}</span>
				<svg
					class="expand-icon"
					class:rotated={expanded}
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</button>
		{/if}
	</div>
</section>

<style>
	.downloads-section {
		padding: 120px 0 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.dl-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		text-align: center;
		margin-bottom: 30px;
	}

	.dl-badge {
		font-family: var(--font-secondary);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		background: linear-gradient(90deg, var(--brand-pink), var(--brand-purple));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	.dl-heading {
		font-family: var(--font-primary);
		font-size: var(--text-h2);
		font-weight: 500;
		color: var(--text-primary);
		line-height: var(--line-height-title);
	}

	.dl-subtitle {
		max-width: 560px;
		margin: 0 auto;
		font-family: var(--font-secondary);
		font-size: var(--text-body);
		font-weight: 400;
		color: var(--text-secondary);
		line-height: var(--line-height-body);
	}

	.downloads-row {
		display: flex;
		flex-direction: row;
		gap: 10px;
		width: 100%;
	}

	.downloads-row.secondary {
		flex-wrap: wrap;
		align-items: stretch;
	}

	.downloads-row.secondary .dl-card {
		flex: 1 1 calc(33.333% - 10px);
		min-width: 200px;
	}

	.dl-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 30px;
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		padding: 30px 20px;
		text-decoration: none;
		color: var(--text-primary);
		overflow: hidden;
		transition: border-color 0.2s ease;
	}

	.dl-card:hover {
		border-color: var(--border-hover);
	}

	.dl-inner {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 20px;
	}

	.dl-icon-wrap {
		flex-shrink: 0;
	}

	.dl-icon {
		width: 80px;
		height: 80px;
		object-fit: contain;
		display: block;
		border-radius: 18px;
	}

	.dl-texts {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.dl-title {
		font-family: 'Inter', sans-serif;
		font-size: 34px;
		font-weight: 400;
		line-height: 1.4em;
		color: var(--text-primary);
		margin: 0;
	}

	.dl-count {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 400;
		color: var(--text-secondary);
		margin: 0;
	}

	.dl-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 57px;
		padding: 14px 20px;
		border-radius: 33px;
		border: 1px solid var(--border-hover);
		background: var(--bg-subtle);
		backdrop-filter: blur(10px);
		box-shadow: none;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.6em;
		color: var(--text-primary);
		cursor: pointer;
		transition: background 0.2s ease;
		box-sizing: border-box;
	}

	.dl-card:hover .dl-btn {
		background: var(--bg-card-hover);
	}

	.expand-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 100%;
		padding: 16px 24px;
		margin-top: 8px;
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		color: var(--text-primary);
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 400;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.expand-btn:hover {
		border-color: var(--border-hover);
		background: var(--bg-subtle);
	}

	.expand-icon {
		transition: transform 0.3s ease;
	}

	.expand-icon.rotated {
		transform: rotate(180deg);
	}

	@media (max-width: 1199px) {
		.dl-title {
			font-size: 25px;
		}

		.downloads-row.secondary .dl-card {
			flex: 1 1 calc(50% - 10px);
		}
	}

	@media (max-width: 900px) {
		.downloads-section {
			padding-top: 80px;
		}
	}

	@media (max-width: 809px) {
		.downloads-row {
			flex-direction: column;
		}

		.dl-title {
			font-size: 22px;
		}

		.dl-card {
			border-radius: 24px;
		}

		.expand-btn {
			border-radius: 24px;
		}

		.downloads-row.secondary .dl-card {
			flex: 1 1 100%;
		}
	}
</style>
