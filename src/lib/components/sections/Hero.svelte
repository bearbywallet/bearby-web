<script lang="ts">
	import logo from '$lib/assets/logo.svg';
</script>

<section id="hero-header" class="hero">
	<div class="hero__inner">
		<div class="hero__content">
			<div class="hero__icon-wrap">
				<img src={logo} alt="Bearby" class="hero__icon" />
			</div>

			<div class="hero__glow" aria-hidden="true"></div>

			<h1 class="hero__title">
				Quantam Proof Portal to the<br class="hero__br" /> decentralized world
			</h1>

			<p class="hero__subtitle">
				Quantum-resistant, multi-currency decentralized wallet, functioning as a browser extension
				compatible with the EVM-compatible networks.
			</p>

			<a
				href="https://github.com/zilpay"
				target="_blank"
				rel="noopener noreferrer"
				class="hero__cta"
			>
				Open-Source Github
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 120px 20px 100px;
		background: #000;
		overflow: hidden;
	}

	.hero__inner {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 1140px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 20px;
		max-width: 680px;
	}

	.hero__icon-wrap {
		width: 80px;
		height: 80px;
		border-radius: 24px;
		background: rgba(250, 250, 250, 0.05);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(230, 230, 230, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		margin-bottom: 20px;
	}

	.hero__icon {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.hero__glow {
		position: absolute;
		top: -100px;
		left: 50%;
		transform: translateX(-50%);
		width: 600px;
		height: 400px;
		background: radial-gradient(
			ellipse at center,
			rgba(172, 89, 255, 0.15) 0%,
			rgba(232, 0, 111, 0.1) 30%,
			transparent 70%
		);
		pointer-events: none;
		z-index: -1;
	}

	.hero__title {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 400;
		line-height: 1.1;
		letter-spacing: -0.025em;
		background: linear-gradient(135deg, #e8006f 0%, #ac59ff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
	}

	.hero__br {
		display: block;
	}

	.hero__subtitle {
		font-size: 1rem;
		line-height: 1.7;
		color: var(--color-text-muted);
		max-width: 520px;
		margin: 0;
	}

	.hero__cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 16px 32px;
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text);
		background: rgba(250, 250, 250, 0.05);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 38px;
		border: 1px solid rgba(212, 212, 212, 0.3);
		text-decoration: none;
		transition: all 0.2s;
		box-shadow: inset 0 0 25px 5px rgba(255, 255, 255, 0.05);
	}

	.hero__cta:hover {
		background: rgba(250, 250, 250, 0.1);
		border-color: var(--color-text-muted);
	}

	@media (max-width: 809px) {
		.hero {
			padding: 100px 20px 80px;
		}

		.hero__icon-wrap {
			width: 64px;
			height: 64px;
			padding: 12px;
		}
	}

	@media (max-width: 480px) {
		.hero__br {
			display: none;
		}
	}
</style>
