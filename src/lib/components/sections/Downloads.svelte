<script lang="ts">
	import { getDownloads } from '$lib/data/downloads';
	import * as m from '$lib/paraglide/messages';

	const downloads = getDownloads();

	let expanded = $state(false);

	const primaryDownloads = downloads.filter((d) => !d.secondary);
	const secondaryDownloads = downloads.filter((d) => d.secondary);

	const icons: Record<string, string> = {
		android: '/img/dl-google-play.png',
		ios: '/img/dl-app-store.png',
		chrome: '/img/dl-chrome.png',
		firefox: '/img/dl-firefox.png',
		rustore: '/img/dl-rustore.png',
		huawei: '/img/dl-app-gallery.png',
		apk: '/img/android.png',
		windows: '/img/win.png',
		macos: '/img/macosx.png',
		linux: '/img/linux.png',
		'old-chrome': '/img/dl-chrome.png',
		'old-firefox': '/img/dl-firefox.png'
	};

	const getIcon = (platform: string) => icons[platform] || '';
</script>

<section id="downloads" class="downloads-section">
	<div class="container">
		<div class="downloads-row">
			{#each primaryDownloads.slice(0, 3) as dl (dl.platform)}
				<a href={dl.href} class="dl-card" target="_blank" rel="noopener noreferrer">
					<div class="dl-inner">
						<div class="dl-icon-wrap">
							<img src={getIcon(dl.platform)} alt={dl.label} class="dl-icon" />
						</div>
						<div class="dl-texts">
							<h4 class="dl-title">{dl.label}</h4>
							<p class="dl-count">{dl.count}</p>
						</div>
					</div>
					<div class="dl-btn">
						{dl.action}
					</div>
				</a>
			{/each}
		</div>
		<div class="downloads-row">
			{#each primaryDownloads.slice(3) as dl (dl.platform)}
				<a href={dl.href} class="dl-card" target="_blank" rel="noopener noreferrer">
					<div class="dl-inner">
						<div class="dl-icon-wrap">
							<img src={getIcon(dl.platform)} alt={dl.label} class="dl-icon" />
						</div>
						<div class="dl-texts">
							<h4 class="dl-title">{dl.label}</h4>
							<p class="dl-count">{dl.count}</p>
						</div>
					</div>
					<div class="dl-btn">
						{dl.action}
					</div>
				</a>
			{/each}
		</div>
		{#if expanded}
			<div class="downloads-row secondary">
				{#each secondaryDownloads as dl (dl.platform)}
					<a href={dl.href} class="dl-card" target="_blank" rel="noopener noreferrer">
						<div class="dl-inner">
							<div class="dl-icon-wrap">
								<img src={getIcon(dl.platform)} alt={dl.label} class="dl-icon" />
							</div>
							<div class="dl-texts">
								<h4 class="dl-title">{dl.label}</h4>
								<p class="dl-count">{dl.count}</p>
							</div>
						</div>
						<div class="dl-btn">
							{dl.action}
						</div>
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
		padding: 8px 8px 0;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.downloads-row {
		display: flex;
		flex-direction: row;
		gap: 10px;
		width: 100%;
	}

	.downloads-row.secondary {
		flex-wrap: wrap;
	}

	.downloads-row.secondary .dl-card {
		flex: 1 1 calc(33.333% - 10px);
		min-width: 200px;
	}

	.downloads-row.secondary {
		align-items: stretch;
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

	@media (max-width: 809px) {
		.downloads-row {
			flex-direction: column;
		}

		.dl-title {
			font-size: 22px;
		}

		.dl-card {
			border-radius: 32px;
		}

		.downloads-row.secondary .dl-card {
			flex: 1 1 100%;
		}
	}
</style>
