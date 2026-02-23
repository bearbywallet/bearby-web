<script lang="ts">
	import { features } from '$lib/data/features';
</script>

<section id="features" class="features-section">
	<div class="container">
		<div class="features-grid">
			{#each features as feature, i (feature.title)}
				<div class="feature-card">
					<div class="feature-icon">
						{#if i === 0}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--text-primary)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
								></path></svg
							>
						{:else if i === 1}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--text-primary)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path
									d="M7 11V7a5 5 0 0 1 10 0v4"
								></path></svg
							>
						{:else if i === 2}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--text-primary)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg
							>
						{:else}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--text-primary)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline
									points="22 4 12 14.01 9 11.01"
								></polyline></svg
							>
						{/if}
					</div>
					<div class="feature-content">
						<h3 class="feature-title">{feature.title}</h3>
						<p class="feature-desc">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>

		<div class="showcase-grid">
			<div class="showcase-card">
				<div class="showcase-content">
					<h2 class="showcase-title">In app dApps and browsers</h2>
					<p class="showcase-desc">
						Summarize long texts in seconds or generate professional content from scratch. Perfect
						for professionals!
					</p>
				</div>
				<div class="showcase-image-wrap">
					<img src="/img/phone-dapps.png" alt="dApps Interface" class="showcase-image" />
				</div>
			</div>

			<div class="showcase-card">
				<div class="showcase-content">
					<h2 class="showcase-title">Native Bitcoin Support</h2>
					<p class="showcase-desc">
						Native Bitcoin Support to store and trade your bitcoin securely. Designed to protect
						assets from Quantum risks.
					</p>
				</div>
				<div class="showcase-image-wrap">
					<img src="/img/phone-bitcoin.png" alt="Hardware Wallet" class="showcase-image hw-image" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.features-section {
		padding: 0 0 100px;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: repeat(2, minmax(0, 1fr));
		gap: 50px;
		padding: 100px;
		background-color: var(--gray-950);
		border: 1px solid var(--gray-800);
		border-radius: 40px;
		overflow: hidden;
	}

	.feature-card {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 20px;
	}

	.feature-icon {
		flex: none;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
	}

	.feature-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.feature-title {
		font-family: var(--font-secondary);
		font-size: 18px;
		font-weight: 500;
		font-style: normal;
		color: var(--text-primary);
		line-height: 1.4em;
		letter-spacing: 0em;
	}

	.feature-desc {
		font-family: var(--font-secondary);
		font-size: 14px;
		font-weight: 400;
		font-style: normal;
		color: var(--gray-400);
		line-height: 1.6em;
		letter-spacing: 0em;
	}

	.showcase-grid {
		display: flex;
		flex-direction: row;
		gap: 10px;
		margin-top: 10px;
	}

	.showcase-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 100px 50px;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: 40px;
		overflow: hidden;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.showcase-content {
		text-align: center;
		max-width: 400px;
	}

	.showcase-title {
		font-family: var(--font-primary);
		font-size: 48px;
		font-weight: 500;
		font-style: normal;
		color: var(--text-primary);
		line-height: 1.1em;
		letter-spacing: -0.02em;
		margin-bottom: 20px;
	}

	.showcase-desc {
		font-family: var(--font-secondary);
		font-size: 14px;
		font-weight: 400;
		font-style: normal;
		color: var(--gray-400);
		line-height: 1.6em;
		letter-spacing: 0em;
	}

	.showcase-image-wrap {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		width: 100%;
	}

	.showcase-image {
		max-width: 280px;
		max-height: 500px;
		object-fit: contain;
		object-position: bottom;
	}

	.hw-image {
		max-height: 450px;
	}

	@media (min-width: 810px) and (max-width: 1199.98px) {
		.features-grid {
			padding: 50px;
		}

		.showcase-card {
			padding: 50px;
		}
	}

	@media (max-width: 809.98px) {
		.features-section {
			padding: 0 0 70px;
		}

		.features-grid {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			gap: 29px;
			padding: 50px;
			border-radius: 24px;
		}

		.showcase-grid {
			flex-direction: column;
		}

		.showcase-card {
			padding: 50px 30px;
		}

		.showcase-title {
			font-size: 32px;
		}

		.showcase-image {
			max-width: 220px;
			max-height: 400px;
		}
	}
</style>
