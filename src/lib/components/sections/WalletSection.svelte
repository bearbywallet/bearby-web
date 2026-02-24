<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	type Feature = { title: string; desc: string; iconType: 'circle' | 'shield' };

	const features: Feature[] = [
		{
			title: m.wallet_failproof_title(),
			desc: m.wallet_failproof_desc(),
			iconType: 'circle'
		},
		{
			title: m.wallet_secure_title(),
			desc: m.wallet_secure_desc(),
			iconType: 'shield'
		}
	];
</script>

<section id="wallet" class="wallet-section">
	<div class="container">
		<div class="wallet-card">
			<div class="visual-col">
				<img src="/img/network-sphere.webp" alt="Network nodes" class="network-img" loading="lazy" width="1024" height="1024" />
			</div>

			<div class="content-col">
				<h2 class="title">{m.wallet_title()}</h2>
				<p class="description">
					{m.wallet_desc()}
				</p>

				<div class="features-row">
					{#each features as feature (feature.title)}
						<div class="feature-item">
							<span class="feature-icon">
								{#if feature.iconType === 'circle'}
									<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="18.5" cy="18.5" r="17.5" stroke="currentColor" stroke-width="1.5" />
										<circle cx="18.5" cy="18.5" r="6" fill="currentColor" />
									</svg>
								{:else}
									<svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M18.5 3.5L6 8.5V18c0 7.732 5.373 14.963 12.5 17 7.127-2.037 12.5-9.268 12.5-17V8.5L18.5 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
										<path d="m13 18.5 3.5 3.5 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
									</svg>
								{/if}
							</span>
							<h3 class="feature-title">{feature.title}</h3>
							<p class="feature-desc">{feature.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.wallet-section {
		padding: 8px 8px 0;
	}

	.wallet-card {
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		padding: 70px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 48px;
		overflow: hidden;
	}

	.visual-col {
		flex: 1 0 0;
		max-width: 350px;
		max-height: 450px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.network-img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	.content-col {
		flex: 1 0 0;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.title {
		font-size: clamp(2rem, 4vw, 3.25rem);
		font-weight: 600;
		line-height: 1.2;
		color: var(--text-primary);
		font-family: var(--font-secondary);
	}

	.description {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.features-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
		margin-top: 8px;
	}

	.feature-item {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.feature-icon {
		color: var(--text-primary);
		display: block;
		width: 37px;
		height: 37px;
	}

	.feature-title {
		font-size: 1.125rem;
		font-weight: 600;
		font-family: var(--font-secondary);
		color: var(--text-primary);
	}

	.feature-desc {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	@media (max-width: 900px) {
		.wallet-card {
			flex-direction: column;
			padding: 50px;
			gap: 40px;
		}

		.visual-col {
			max-width: 300px;
		}

		.features-row {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.wallet-card {
			padding: 32px 24px;
			border-radius: var(--border-radius-xl);
		}
	}
</style>
