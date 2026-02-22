<section id="hero-header" class="hero">
	<!-- Phone hero image / mockup -->
	<div class="hero__device" aria-hidden="true">
		<div class="hero__phone">
			<div class="hero__phone-screen">
				<div class="hero__screen-header">
					<span class="hero__screen-dot"></span>
					<span class="hero__screen-bal">0.05δΙΘΑ Σ</span>
				</div>
				<div class="hero__screen-assets">
					<div class="hero__screen-row">
						<span class="hero__screen-name">Ethereum</span>
						<span class="hero__screen-val" style="color:#627eea">2.390 Ξ</span>
					</div>
					<div class="hero__screen-row">
						<span class="hero__screen-name">USDC</span>
						<span class="hero__screen-val">8 USDC</span>
					</div>
					<div class="hero__screen-row">
						<span class="hero__screen-name">WBTC</span>
						<span class="hero__screen-val" style="color:#f7931a">0.41225</span>
					</div>
				</div>
				<div class="hero__screen-glow" aria-hidden="true"></div>
			</div>
		</div>
	</div>

	<div class="hero__inner">
		<h1 class="hero__headline">
			Quantam Proof Portal to the<br class="hero__br" /> decentralized world
		</h1>

		<p class="hero__subheading">
			Quantum-resistant, multi-currency decentralized wallet, functioning as a browser extension
			compatible with the EVM-compatible networks.
		</p>

		<a
			href="https://github.com/zilpay"
			class="hero__cta"
			target="_blank"
			rel="noopener noreferrer"
		>
			Open-Source Github
		</a>
	</div>

	<!-- background glows -->
	<div class="hero__glow hero__glow--pink" aria-hidden="true"></div>
	<div class="hero__glow hero__glow--purple" aria-hidden="true"></div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		padding-bottom: var(--space-2xl);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* ── Phone mockup ── */
	.hero__device {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: var(--space-xl) var(--space-md) var(--space-lg);
		position: relative;
		z-index: 1;
	}

	.hero__phone {
		width: 240px;
		border-radius: 36px;
		background: #111;
		border: 1.5px solid #2a2a2a;
		box-shadow:
			0 0 80px color-mix(in srgb, var(--color-accent-purple) 30%, transparent),
			0 40px 80px rgba(0, 0, 0, 0.7);
		overflow: hidden;
	}

	.hero__phone-screen {
		padding: 1.25rem 1rem 1.5rem;
		min-height: 320px;
		position: relative;
		background: linear-gradient(160deg, #1a1020 0%, #0d0d0d 100%);
	}

	.hero__screen-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.hero__screen-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-accent-purple);
	}

	.hero__screen-bal {
		font-size: 0.7rem;
		color: #666;
		font-family: monospace;
	}

	.hero__screen-assets {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.hero__screen-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.75rem;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.hero__screen-name {
		font-size: 0.7rem;
		color: #888;
	}

	.hero__screen-val {
		font-size: 0.75rem;
		color: #ccc;
		font-family: monospace;
	}

	.hero__screen-glow {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--color-accent-purple) 20%, transparent);
		filter: blur(40px);
		pointer-events: none;
	}

	/* ── Text content ── */
	.hero__inner {
		max-width: 680px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		position: relative;
		z-index: 1;
		padding: 0 var(--space-md);
	}

	.hero__headline {
		font-size: clamp(2.25rem, 5.5vw, 3.75rem);
		line-height: 1.1;
		letter-spacing: -0.025em;
		background: linear-gradient(135deg, #ff3c8e 0%, #e8006f 40%, #ff6eb4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero__br {
		display: block;
	}

	.hero__subheading {
		max-width: 520px;
		font-size: 1rem;
		color: var(--color-text-muted);
		line-height: 1.7;
	}

	.hero__cta {
		display: inline-flex;
		align-items: center;
		padding: 0.625rem 1.5rem;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		color: var(--color-text);
		font-size: 0.9375rem;
		text-decoration: none;
		transition: border-color 0.2s, background-color 0.2s;
		margin-top: var(--space-xs);
	}

	.hero__cta:hover {
		border-color: var(--color-text-muted);
		background-color: var(--color-surface);
	}

	/* ── Background glows ── */
	.hero__glow {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
		z-index: 0;
	}

	.hero__glow--pink {
		width: 600px;
		height: 300px;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		background: radial-gradient(ellipse, color-mix(in srgb, #e8006f 15%, transparent), transparent 70%);
	}

	.hero__glow--purple {
		width: 400px;
		height: 400px;
		top: 60px;
		left: 50%;
		transform: translateX(-50%);
		background: radial-gradient(ellipse, color-mix(in srgb, #ac59ff 10%, transparent), transparent 70%);
	}

	@media (max-width: 600px) {
		.hero__phone {
			width: 180px;
		}

		.hero__phone-screen {
			min-height: 240px;
		}
	}
</style>
