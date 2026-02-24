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

<section id="downloads" class="downloads-section">
	<div class="container">
		<div class="downloads-row">
			{#each downloads.slice(0, 3) as dl (dl.platform)}
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
			{#each downloads.slice(3) as dl (dl.platform)}
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

	.dl-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 30px;
		background: rgb(10, 10, 10);
		border: 1px solid rgb(38, 38, 38);
		border-radius: var(--card-radius);
		padding: 30px 20px;
		text-decoration: none;
		color: rgb(245, 245, 245);
		overflow: hidden;
		transition: border-color 0.2s ease;
	}

	.dl-card:hover {
		border-color: rgb(60, 60, 60);
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
		color: rgb(245, 245, 245);
		margin: 0;
	}

	.dl-count {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 400;
		color: rgb(163, 163, 163);
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
		border: 1px solid rgba(230, 230, 230, 0.1);
		background: rgba(250, 250, 250, 0.05);
		backdrop-filter: blur(10px);
		box-shadow:
			rgba(0, 0, 0, 0.59) 0px -0.3px 1.14px -1.67px inset,
			rgba(0, 0, 0, 0.49) 0px -1.14px 4.35px -3.33px inset,
			rgba(0, 0, 0, 0.18) 0px 0.6px 0.6px -1.25px,
			rgba(0, 0, 0, 0.16) 0px 2.29px 2.29px -2.5px,
			rgba(0, 0, 0, 0.06) 0px 10px 10px -3.75px;
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		font-weight: 400;
		line-height: 1.6em;
		color: rgb(229, 229, 229);
		cursor: pointer;
		transition: background 0.2s ease;
		box-sizing: border-box;
	}

	.dl-card:hover .dl-btn {
		background: rgba(250, 250, 250, 0.09);
	}

	@media (max-width: 1199px) {
		.dl-title {
			font-size: 25px;
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
	}
</style>
