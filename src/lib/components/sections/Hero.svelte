<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<div class="hero">
	<section id="about" class="hero-cta">
		<div class="cta-card">
			<div class="icon-wrap">
				<img src="/img/app-icon.webp" alt="Bearby" class="icon" width="320" height="318" />
				<img
					src="/img/app-icon.webp"
					alt=""
					class="icon-glow"
					aria-hidden="true"
					width="320"
					height="318"
				/>
			</div>

			<div class="cta-text">
				<h1>
					<span class="title-gradient">{m.hero_title()}</span>
				</h1>
				<p class="subtitle">
					{m.hero_subtitle()}
				</p>
			</div>

			<Button
				variant="outline"
				href="https://github.com/zilpay"
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z"
					/>
				</svg>
				{m.hero_github_btn()}
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

	@keyframes heroCTAIn {
		from {
			opacity: 0;
			transform: translateY(48px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-cta {
		width: 100%;
		max-width: var(--section-max-width);
		margin: 0 auto;
		padding: 0 24px;
	}

	.cta-card {
		background: var(--bg-card);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		padding: 75px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		overflow: hidden;
		animation: heroCTAIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
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
		background-image: linear-gradient(
			270deg,
			#ac59ff 0%,
			#e80570 49%,
			#e8006f 84%,
			var(--bg-color) 112%
		);
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
		color: var(--text-secondary);
	}

	.btn-icon {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}

	@media (max-width: 1199px) {
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
			border-radius: 24px;
		}

		h1 {
			font-size: 32px;
		}

		.subtitle {
			font-size: 18px;
		}
	}
</style>
