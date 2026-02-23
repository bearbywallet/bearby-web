<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
</script>

<div class="hero">
	<header id="hero-header" class="hero-header">
		<div class="hero-wrap">
			<img src="/img/hero-bg.png" alt="Bearby Wallet" class="hero-phone" />
		</div>
	</header>

	<section id="about" class="hero-cta">
		<div class="cta-card">
			<div class="icon-wrap">
				<img src="/img/app-icon.png" alt="Bearby" class="icon" />
				<img src="/img/app-icon.png" alt="" class="icon-glow" aria-hidden="true" />
			</div>

			<div class="cta-text">
				<h1>
					<span class="title-gradient">Quantam Proof Portal to the decentralized world</span>
				</h1>
				<p class="subtitle">
					Quantum-resistant, multi-currency decentralized wallet, functioning as a browser
					extension compatible with the EVM-compatible networks.
				</p>
			</div>

			<Button
				variant="outline"
				href="https://github.com/zilpay"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src="/img/github-icon.svg" alt="" class="btn-icon" />
				Open-Source Github
			</Button>
		</div>
	</section>
</div>

<style>
	.hero {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.hero-header {
		width: 100%;
	}

	.hero-wrap {
		width: 100%;
		min-height: 100vh;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: visible;
		-webkit-mask: linear-gradient(#000 50%, #0000 100%);
		mask: linear-gradient(#000 50%, #0000 100%);
	}

	.hero-phone {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		-webkit-mask: linear-gradient(#000 86%, #0000 100%);
		mask: linear-gradient(#000 86%, #0000 100%);
	}

	.hero-cta {
		width: 100%;
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.cta-card {
		background: rgba(10, 10, 10, 0.9);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		border: 1px solid #262626;
		border-radius: 48px;
		padding: 75px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		overflow: hidden;
	}

	.icon-wrap {
		position: relative;
		width: 110px;
		height: 110px;
		flex-shrink: 0;
	}

	.icon {
		width: 110px;
		height: 110px;
		object-fit: contain;
		position: relative;
		z-index: 1;
		overflow: clip;
	}

	.icon-glow {
		position: absolute;
		top: 0;
		left: calc(50% - 55px);
		width: 110px;
		height: 110px;
		filter: blur(33px);
		z-index: 0;
	}

	.cta-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 100%;
		text-align: center;
	}

	h1 {
		font-family: 'Inter', sans-serif;
		font-size: 72px;
		font-weight: 600;
		line-height: 1.2em;
		letter-spacing: 0;
	}

	.title-gradient {
		background-image: linear-gradient(270deg, #ac59ff 0%, #e80570 49%, #e8006f 84%, #000 112%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	.subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 28px;
		font-weight: 400;
		line-height: 1.4em;
		color: #fafafa;
	}

	.btn-icon {
		width: 20px;
		height: 20px;
		filter: invert(1);
	}

	@media (max-width: 1199px) {
		.hero-wrap {
			min-height: 80vh;
		}

		.hero-phone {
			-webkit-mask: linear-gradient(#000 76%, #0000 94%);
			mask: linear-gradient(#000 76%, #0000 94%);
		}

		.hero-cta {
			max-width: 95%;
		}

		.cta-card {
			padding: 50px;
		}

		h1 {
			font-size: 58px;
		}
	}

	@media (max-width: 809px) {
		.hero-wrap {
			min-height: 720px;
			padding: 80px 0 100px;
			-webkit-mask: linear-gradient(#000 50%, #0000 94%);
			mask: linear-gradient(#000 50%, #0000 94%);
		}

		.hero-phone {
			-webkit-mask: unset;
			mask: unset;
			max-height: 370px;
			height: 370px;
			object-fit: contain;
		}

		.hero-cta {
			max-width: 95%;
		}

		.icon-wrap,
		.icon,
		.icon-glow {
			width: 80px;
			height: 80px;
		}

		.icon-glow {
			left: calc(50% - 40px);
		}

		.cta-card {
			padding: 50px 25px;
		}

		h1 {
			font-size: 32px;
		}

		.subtitle {
			font-size: 18px;
		}
	}
</style>
