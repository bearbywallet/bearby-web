<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
</script>

<section class="wallet-section">
	<div class="container">
		<Card class="wallet-card">
			<div class="wallet-grid">
				<div class="visual-col">
					<img src="/img/network-sphere.png" alt="Network nodes" class="network-img" />
				</div>

				<div class="content-col">
					<h2 class="title">Wallet that can never be stopped</h2>
					<p class="subtitle">
						The wallet that connects to dozens of independent nodes simultaneously — unlike
						traditional wallets relying on a single point of failure.
					</p>

					<div class="features-row">
						<div class="feature-item">
							<div class="icon-circle"></div>
							<h3>Failproof System</h3>
							<p>Stay 100% operational regardless of how many nodes are offline.</p>
						</div>

						<div class="feature-item">
							<div class="icon-shield">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path
										d="m9 12 2 2 4-4"
									></path></svg
								>
							</div>
							<h3>100% Secure</h3>
							<p>Uncompromising network resilience with zero sacrifice to security.</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	</div>
</section>

<style>
	.wallet-section {
		padding: 24px 0;
	}

	:global(.wallet-card) {
		padding: 0 !important;
		background: #0a0a0a !important;
	}

	.wallet-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 48px;
	}

	.visual-col {
		padding: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.network-img {
		width: 100%;
		max-width: 400px;
		object-fit: contain;
	}

	.content-col {
		padding: 64px 64px 64px 0;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.title {
		font-size: clamp(2rem, 4vw, 3rem);
		color: var(--text-primary);
	}

	.subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 24px;
	}

	.features-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
	}

	.feature-item {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.icon-circle {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 2px solid var(--text-primary);
		margin-bottom: 8px;
	}

	.icon-shield {
		color: var(--text-primary);
		margin-bottom: 8px;
	}

	.feature-item h3 {
		font-size: 1rem;
		font-weight: 600;
		font-family: var(--font-secondary);
		color: var(--text-primary);
	}

	.feature-item p {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	@media (max-width: 900px) {
		.wallet-grid {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.content-col {
			padding: 0 32px 48px;
		}
		.visual-col {
			padding: 32px;
		}
		.features-row {
			grid-template-columns: 1fr;
		}
	}
</style>
