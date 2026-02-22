<script lang="ts">
	import { downloads } from '$lib/data/downloads';

	const getIcon = (platform: string) => {
		switch (platform) {
			case 'android':
				return '/img/dl-google-play.png';
			case 'ios':
				return '/img/dl-app-store.png';
			case 'chrome':
				return '/img/dl-chrome.png';
			case 'firefox':
				return '/img/dl-firefox.png';
			case 'rustore':
				return '/img/dl-rustore.png';
			case 'huawei':
				return '/img/dl-app-gallery.png';
			default:
				return '';
		}
	};
</script>

<section id="downloads" class="downloads">
	<div class="container">
		<div class="downloads-grid">
			{#each downloads as dl}
				<a href={dl.href} class="dl-card" target="_blank" rel="noopener noreferrer">
					<img src={getIcon(dl.platform)} alt={dl.label} class="dl-icon" />
					<div class="dl-content">
						<h3 class="dl-title">{dl.label}</h3>
						<p class="dl-count">{dl.count}</p>
					</div>
					<div class="dl-btn">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline
								points="7 10 12 15 17 10"
							></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg
						>
						{dl.action}
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.downloads {
		padding: 64px 0 128px 0;
	}

	.downloads-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.dl-card {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-lg);
		padding: 32px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		transition: all 0.2s;
		text-decoration: none;
		color: var(--text-primary);
	}

	.dl-card:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--border-hover);
	}

	.dl-icon {
		width: 48px;
		height: 48px;
		object-fit: contain;
		margin-bottom: 8px;
	}

	.dl-content {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
	}

	.dl-title {
		font-size: 1.125rem;
		font-weight: 500;
	}

	.dl-count {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.dl-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		border-radius: 40px;
		font-size: 0.875rem;
		font-weight: 500;
		width: 100%;
		justify-content: center;
		margin-top: 16px;
		transition: background 0.2s;
	}

	.dl-card:hover .dl-btn {
		background: rgba(255, 255, 255, 0.08);
	}

	@media (max-width: 900px) {
		.downloads-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.downloads-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
