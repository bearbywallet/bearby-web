<script lang="ts">
	import { downloads } from '$lib/data/downloads';
</script>

<section id="downloads" class="downloads">
	<div class="downloads__inner">
		<h2 class="downloads__title">Download Bearby</h2>
		<p class="downloads__subtitle">
			Available on all major platforms. Get started with Bearby today.
		</p>
		<div class="downloads__grid">
			{#each downloads as dl (dl.platform)}
				<a
					href={dl.href}
					class="downloads__card"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Download Bearby — {dl.label}"
				>
					<div class="downloads__icon-wrap" data-platform={dl.platform} aria-hidden="true">
						{#if dl.platform === 'android'}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
								><path
									d="M17.523 15.341a.85.85 0 0 1-.853-.854.85.85 0 0 1 .853-.854.85.85 0 0 1 .854.854.85.85 0 0 1-.854.854zm-11.046 0a.85.85 0 0 1-.854-.854.85.85 0 0 1 .854-.854.85.85 0 0 1 .854.854.85.85 0 0 1-.854.854zm11.405-6.01l1.997-3.46a.416.416 0 0 0-.152-.567.416.416 0 0 0-.567.152l-2.021 3.502A12.02 12.02 0 0 0 12 7.288c-1.789 0-3.479.39-5.139 1.07L4.84 4.856a.416.416 0 0 0-.567-.152.416.416 0 0 0-.152.567l1.997 3.46C2.688 10.467.353 13.722.022 17.5h23.956c-.331-3.778-2.666-7.033-6.096-8.169zM6.48 15.341a1.71 1.71 0 0 1-1.707-1.707 1.71 1.71 0 0 1 1.707-1.707 1.71 1.71 0 0 1 1.707 1.707 1.71 1.71 0 0 1-1.707 1.707zm11.04 0a1.71 1.71 0 0 1-1.707-1.707 1.71 1.71 0 0 1 1.707-1.707 1.71 1.71 0 0 1 1.707 1.707 1.71 1.71 0 0 1-1.707 1.707z"
								/></svg
							>
						{:else if dl.platform === 'ios'}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
								><path
									d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
								/></svg
							>
						{:else if dl.platform === 'chrome'}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
								><path
									d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29L1.931 5.47zm13.852 8.36a5.446 5.446 0 0 1-1.85 1.85l3.953 6.848A11.94 11.94 0 0 0 24 12c0-1.975-.478-3.84-1.324-5.486H13.783z"
								/></svg
							>
						{:else if dl.platform === 'firefox'}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
								><path
									d="M23.75 12.04c-.018.197-.056.39-.112.576-.027.089-.058.175-.095.26a2.56 2.56 0 0 1-.213.393 3.08 3.08 0 0 1-.298.382c-.07.076-.144.15-.222.22-.06.054-.12.107-.184.158-.023.018-.045.036-.07.053-.082.06-.168.117-.257.17-.033.02-.068.04-.102.058a3.01 3.01 0 0 1-.326.145c-.065.025-.13.047-.197.067a2.95 2.95 0 0 1-.278.066c-.073.014-.146.026-.22.034-.096.011-.193.016-.29.016-.06 0-.12-.002-.18-.007a3.07 3.07 0 0 1-.266-.03 3.05 3.05 0 0 1-.258-.052c-.084-.022-.166-.048-.247-.078a2.97 2.97 0 0 1-.236-.103 3.01 3.01 0 0 1-.22-.125c-.08-.05-.155-.105-.227-.163-.064-.05-.125-.105-.184-.161-.06-.058-.117-.118-.17-.182a2.99 2.99 0 0 1-.278-.397c-.04-.07-.077-.14-.11-.213a3.02 3.02 0 0 1-.132-.343 2.97 2.97 0 0 1-.106-.48 3.06 3.06 0 0 1-.036-.5c0-.08.003-.16.01-.238.008-.09.02-.18.036-.267.017-.09.038-.179.064-.266.027-.09.058-.178.094-.264a2.94 2.94 0 0 1 .24-.466c.048-.076.1-.15.155-.222.057-.074.118-.145.182-.214.066-.07.135-.137.207-.202.064-.057.13-.112.198-.165.07-.053.142-.104.217-.152.076-.049.155-.095.235-.139.08-.043.163-.084.247-.122.086-.04.174-.076.263-.11.09-.033.182-.063.275-.09.095-.027.19-.05.288-.07.1-.02.2-.036.302-.047.1-.01.203-.016.305-.016.1 0 .2.005.3.015.097.01.194.025.29.045.094.02.187.044.28.072.09.028.18.06.27.096.086.035.172.074.256.117.082.042.163.088.242.138.077.05.153.102.226.158.072.056.142.115.21.177.066.062.13.127.192.194.06.068.118.138.173.21.055.074.107.15.156.227.048.079.094.16.136.242.042.084.081.17.116.256.035.088.067.177.095.268.028.09.053.183.074.276.02.094.037.19.05.285.012.097.02.195.024.293.003.1.003.198 0 .296z"
								/></svg
							>
						{:else if dl.platform === 'rustore'}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
								><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg
							>
						{:else if dl.platform === 'huawei'}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
								><path
									d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
								/></svg
							>
						{:else}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
									points="7 10 12 15 17 10"
								/><line x1="12" y1="15" x2="12" y2="3" /></svg
							>
						{/if}
					</div>
					<div class="downloads__meta">
						<span class="downloads__platform">{dl.label}</span>
						<span class="downloads__count">{dl.count}</span>
					</div>
					<span class="downloads__btn">{dl.action}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.downloads {
		padding: 100px 20px;
		background: #000;
	}

	.downloads__inner {
		max-width: 1140px;
		margin: 0 auto;
	}

	.downloads__title {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-text);
		line-height: 1.2;
		text-align: center;
		margin: 0 0 12px 0;
	}

	.downloads__subtitle {
		font-size: 1rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		text-align: center;
		margin: 0 0 40px 0;
	}

	.downloads__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	@media (max-width: 800px) {
		.downloads__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.downloads__grid {
			grid-template-columns: 1fr;
		}
	}

	.downloads__card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px;
		background: rgba(250, 250, 250, 0.05);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 24px;
		border: 1px solid rgba(230, 230, 230, 0.1);
		text-decoration: none;
		transition: all 0.2s;
		cursor: pointer;
	}

	.downloads__card:hover {
		border-color: rgba(172, 89, 255, 0.5);
		background: rgba(250, 250, 250, 0.08);
	}

	.downloads__icon-wrap {
		width: 52px;
		height: 52px;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(250, 250, 250, 0.05);
		border: 1px solid rgba(230, 230, 230, 0.1);
		color: var(--color-text-muted);
	}

	.downloads__icon-wrap[data-platform='android'] {
		color: #78c257;
	}

	.downloads__icon-wrap[data-platform='ios'] {
		color: #aaa;
	}

	.downloads__icon-wrap[data-platform='chrome'] {
		color: #4285f4;
	}

	.downloads__icon-wrap[data-platform='firefox'] {
		color: #ff7139;
	}

	.downloads__icon-wrap[data-platform='rustore'] {
		color: #8b80f9;
	}

	.downloads__icon-wrap[data-platform='huawei'] {
		color: #cf0a2c;
	}

	.downloads__meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
	}

	.downloads__platform {
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.downloads__count {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
	}

	.downloads__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 12px 20px;
		border-radius: 12px;
		background: rgba(250, 250, 250, 0.05);
		border: 1px solid rgba(230, 230, 230, 0.1);
		color: var(--color-text);
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.downloads__card:hover .downloads__btn {
		border-color: rgba(172, 89, 255, 0.5);
		color: #ac59ff;
	}
</style>
