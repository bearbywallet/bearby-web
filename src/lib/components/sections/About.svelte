<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
</script>

<section id="about" class="extra-features">
	<div class="container">
		<div class="showcase-banner">
			<img src="/img/feature-showcase.png" alt="Encryption Setup" class="banner-image" />
		</div>

		<div class="split-features">
			<div class="features-list">
				<button class="list-item active"> Regional Language Support </button>
				<button class="list-item"> Native Bitcoin Support </button>
				<button class="list-item"> In app browser for Dapps </button>
			</div>

			<div class="mockup-container">
				<img src="/img/phone-mockup-1.png" alt="Bearby App Mockup" class="mockup-image" />
			</div>
		</div>
	</div>
</section>

<style>
	.extra-features {
		padding: 24px 0 64px 0;
	}

	.showcase-banner {
		width: 100%;
		margin-bottom: 24px;
		border-radius: var(--border-radius-lg);
		overflow: hidden;
		border: 1px solid var(--border-color);
	}

	.banner-image {
		width: 100%;
		height: auto;
		display: block;
	}

	.split-features {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}

	.features-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.list-item {
		padding: 24px 32px;
		display: flex;
		align-items: center;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 40px;
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--text-secondary);
		text-align: left;
		transition: all 0.2s;
	}

	.list-item:hover {
		color: var(--text-primary);
	}

	.list-item.active {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--border-color);
		color: var(--text-primary);
	}

	.mockup-container {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-lg);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 48px;
		overflow: hidden;
	}

	.mockup-image {
		max-width: 100%;
		max-height: 400px;
		object-fit: contain;
	}

	@media (max-width: 768px) {
		.split-features {
			grid-template-columns: 1fr;
		}
		.mockup-container {
			padding: 32px;
		}
	}
</style>
