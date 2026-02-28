<script lang="ts">
	import { getFeatures } from '$lib/data/features';

	const features = getFeatures();
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
	</div>
</section>

<style>
	.features-section {
		padding: 0;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: repeat(2, minmax(0, 1fr));
		gap: 50px;
		padding: 100px;
		background-color: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
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
		background: var(--bg-subtle);
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
		color: var(--text-secondary);
		line-height: 1.6em;
		letter-spacing: 0em;
	}

	@media (min-width: 810px) and (max-width: 1199.98px) {
		.features-grid {
			padding: 50px;
		}
	}

	@media (max-width: 809.98px) {
		.features-grid {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			gap: 29px;
			padding: 50px;
			border-radius: 24px;
		}
	}
</style>
