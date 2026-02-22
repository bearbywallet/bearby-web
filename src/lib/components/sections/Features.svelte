<script lang="ts">
	import { features } from '$lib/data/features';
	import Card from '$lib/components/ui/Card.svelte';
</script>

<section id="features" class="features-section">
	<div class="container">
		<div class="features-bento">
			{#each features as feature, i (feature.title)}
				<Card class="feature-card">
					<div class="feature-icon">
						{#if i === 0}
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--brand-green)"
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
					<h3 class="feature-title">
						{#if i === 0}
							<span class="highlight">{feature.title}</span>
						{:else}
							{feature.title}
						{/if}
					</h3>
					<p class="feature-desc">{feature.description}</p>
				</Card>
			{/each}
		</div>

		<div class="showcase-bento">
			<Card class="showcase-card showcase-left">
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
			</Card>

			<Card class="showcase-card showcase-right">
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
			</Card>
		</div>
	</div>
</section>

<style>
	.features-section {
		padding: 24px 0;
	}

	.features-bento {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin-bottom: 16px;
	}

	:global(.feature-card) {
		padding: 24px !important;
	}

	.feature-icon {
		margin-bottom: 16px;
	}

	.feature-title {
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: 8px;
	}

	.highlight {
		background: rgba(10, 201, 77, 0.2);
		color: var(--brand-green);
		padding: 2px 8px;
		border-radius: 4px;
		display: inline-block;
	}

	.feature-desc {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.showcase-bento {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	:global(.showcase-card) {
		display: flex !important;
		flex-direction: column;
		padding: 48px 48px 0 48px !important;
		overflow: hidden;
		height: 600px;
		justify-content: space-between;
	}

	.showcase-content {
		text-align: center;
		margin-bottom: 48px;
	}

	.showcase-title {
		font-size: clamp(1.5rem, 3vw, 2.5rem);
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: 16px;
	}

	.showcase-desc {
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 400px;
		margin: 0 auto;
	}

	.showcase-image-wrap {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.showcase-image {
		max-width: 100%;
		max-height: 400px;
		object-fit: contain;
		object-position: bottom;
	}

	.hw-image {
		max-height: 350px;
	}

	@media (max-width: 1024px) {
		.features-bento {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.features-bento {
			grid-template-columns: 1fr;
		}
		.showcase-bento {
			grid-template-columns: 1fr;
		}
		:global(.showcase-card) {
			height: 500px;
			padding: 32px 32px 0 32px !important;
		}
	}
</style>
