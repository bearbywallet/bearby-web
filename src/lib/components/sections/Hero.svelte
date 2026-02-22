<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
</script>

<section id="hero-header" class="hero-section">
	<div class="hero-image-container">
		<img src="/img/hero-phone-dark.png" alt="Bearby Wallet UI" class="hero-image" />
		<div class="hero-fade-bottom"></div>
	</div>

	<div class="container hero-content-container">
		<Card class="hero-card">
			<div class="hero-card-inner">
				<div class="icon-wrapper">
					<img src="/img/app-icon.png" alt="Bearby logo" class="app-icon" />
				</div>

				<h1 class="hero-title">
					<span class="text-gradient">Quantam Proof Portal to the</span><br />
					decentralized world
				</h1>

				<p class="hero-subtitle">
					Quantum-resistant, multi-currency decentralized wallet, functioning as a browser extension
					compatible with the EVM-compatible networks.
				</p>

				<Button
					variant="outline"
					href="https://github.com/zilpay"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="/img/github-icon.svg" alt="Github" class="github-icon" />
					Open-Source Github
				</Button>
			</div>
		</Card>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}

	.hero-image-container {
		position: relative;
		width: 100%;
		max-width: 1200px;
		height: 900px;
		display: flex;
		justify-content: center;
		z-index: 1;
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
	}

	.hero-fade-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 400px;
		background: linear-gradient(to bottom, transparent, var(--bg-color) 80%);
		z-index: 2;
	}

	.hero-content-container {
		position: relative;
		z-index: 10;
		margin-top: -150px;
		display: flex;
		justify-content: center;
	}

	:global(.hero-card) {
		max-width: 800px;
		width: 100%;
		text-align: center;
		padding: 48px;
		background: #0a0a0a !important;
	}

	.hero-card-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	.icon-wrapper {
		width: 80px;
		height: 80px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border-color);
	}

	.app-icon {
		width: 60px;
		height: 60px;
		object-fit: contain;
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 500;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	.hero-subtitle {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 600px;
		line-height: 1.6;
	}

	.github-icon {
		width: 20px;
		height: 20px;
		filter: invert(1);
	}

	@media (max-width: 768px) {
		.hero-image-container {
			height: 600px;
		}
		.hero-content-container {
			margin-top: -100px;
		}
		:global(.hero-card) {
			padding: 32px 24px;
		}
	}
</style>
