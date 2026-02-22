<section id="about" class="about">
	<div class="about__inner">
		<!-- Left: node network visualization -->
		<div class="about__viz" aria-hidden="true">
			<svg class="about__network" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<radialGradient id="node-grad" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stop-color="#ac59ff" stop-opacity="1" />
						<stop offset="100%" stop-color="#6c30e0" stop-opacity="0.6" />
					</radialGradient>
					<filter id="glow">
						<feGaussianBlur stdDeviation="2.5" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				<!-- Connection lines -->
				<g stroke="#ac59ff" stroke-opacity="0.18" stroke-width="1">
					<line x1="190" y1="190" x2="130" y2="140" />
					<line x1="190" y1="190" x2="250" y2="140" />
					<line x1="190" y1="190" x2="300" y2="200" />
					<line x1="190" y1="190" x2="250" y2="260" />
					<line x1="190" y1="190" x2="130" y2="260" />
					<line x1="190" y1="190" x2="80" y2="190" />
					<line x1="190" y1="190" x2="190" y2="70" />
					<line x1="190" y1="190" x2="190" y2="320" />
					<line x1="130" y1="140" x2="250" y2="140" />
					<line x1="130" y1="140" x2="80" y2="100" />
					<line x1="130" y1="140" x2="190" y2="70" />
					<line x1="130" y1="140" x2="80" y2="190" />
					<line x1="250" y1="140" x2="300" y2="100" />
					<line x1="250" y1="140" x2="300" y2="200" />
					<line x1="250" y1="140" x2="190" y2="70" />
					<line x1="300" y1="200" x2="330" y2="280" />
					<line x1="300" y1="200" x2="250" y2="260" />
					<line x1="250" y1="260" x2="190" y2="320" />
					<line x1="250" y1="260" x2="330" y2="280" />
					<line x1="130" y1="260" x2="80" y2="280" />
					<line x1="130" y1="260" x2="190" y2="320" />
					<line x1="130" y1="260" x2="80" y2="190" />
					<line x1="80" y1="100" x2="50" y2="160" />
					<line x1="80" y1="100" x2="140" y2="40" />
					<line x1="80" y1="100" x2="80" y2="190" />
					<line x1="300" y1="100" x2="340" y2="160" />
					<line x1="300" y1="100" x2="240" y2="40" />
					<line x1="190" y1="70" x2="140" y2="40" />
					<line x1="190" y1="70" x2="240" y2="40" />
					<line x1="50" y1="160" x2="80" y2="190" />
					<line x1="340" y1="160" x2="300" y2="200" />
					<line x1="80" y1="280" x2="50" y2="220" />
					<line x1="80" y1="280" x2="190" y2="320" />
					<line x1="330" y1="280" x2="350" y2="220" />
					<line x1="190" y1="320" x2="190" y2="360" />
					<line x1="140" y1="40" x2="240" y2="40" />
					<line x1="50" y1="160" x2="50" y2="220" />
					<line x1="340" y1="160" x2="350" y2="220" />
				</g>

				<!-- Outer faint nodes -->
				<g fill="#ac59ff" fill-opacity="0.25" filter="url(#glow)">
					<circle cx="140" cy="40" r="3" />
					<circle cx="240" cy="40" r="3" />
					<circle cx="50" cy="160" r="3" />
					<circle cx="340" cy="160" r="3" />
					<circle cx="50" cy="220" r="3" />
					<circle cx="350" cy="220" r="3" />
					<circle cx="80" cy="280" r="3" />
					<circle cx="330" cy="280" r="3" />
					<circle cx="190" cy="360" r="3" />
				</g>

				<!-- Mid-tier nodes -->
				<g fill="#ac59ff" fill-opacity="0.55" filter="url(#glow)">
					<circle cx="80" cy="100" r="4.5" />
					<circle cx="300" cy="100" r="4.5" />
					<circle cx="80" cy="190" r="4.5" />
					<circle cx="300" cy="200" r="5" />
					<circle cx="190" cy="70" r="5" />
					<circle cx="190" cy="320" r="4.5" />
					<circle cx="80" cy="190" r="4" />
				</g>

				<!-- Primary nodes -->
				<g fill="url(#node-grad)" filter="url(#glow)">
					<circle cx="130" cy="140" r="7" />
					<circle cx="250" cy="140" r="7" />
					<circle cx="130" cy="260" r="7" />
					<circle cx="250" cy="260" r="7" />
				</g>

				<!-- Center node -->
				<circle cx="190" cy="190" r="11" fill="#ac59ff" filter="url(#glow)" />
				<circle cx="190" cy="190" r="5" fill="white" fill-opacity="0.7" />

				<!-- Ambient glow -->
				<ellipse cx="190" cy="190" rx="100" ry="100" fill="#ac59ff" fill-opacity="0.04" />
			</svg>
		</div>

		<!-- Right: text content -->
		<div class="about__content">
			<h2 class="about__title">Wallet that can never be stopped</h2>
			<p class="about__body">
				The wallet that connects to dozens of independent nodes simultaneously — unlike traditional
				wallets relying on a single point of failure.
			</p>

			<div class="about__features">
				<div class="about__feature">
					<h3 class="about__feature-title">Failproof System</h3>
					<p class="about__feature-body">
						Stay 100% operational regardless of how many nodes are offline.
					</p>
				</div>
				<div class="about__feature">
					<h3 class="about__feature-title">100% Secure</h3>
					<p class="about__feature-body">
						Uncompromising network resilience with zero sacrifice to security.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		padding: var(--space-2xl) var(--space-md);
		border-top: 1px solid var(--color-border);
	}

	.about__inner {
		max-width: var(--breakpoint-desktop);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-xl);
		align-items: center;
	}

	@media (min-width: 810px) {
		.about__inner {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* ── Network visualization ── */
	.about__viz {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.about__network {
		width: 100%;
		max-width: 380px;
		height: auto;
		opacity: 0.9;
	}

	/* ── Text ── */
	.about__title {
		font-size: clamp(1.75rem, 3.5vw, 2.75rem);
		letter-spacing: -0.025em;
		color: var(--color-text);
		line-height: 1.15;
		margin-bottom: var(--space-sm);
	}

	.about__body {
		font-size: 1rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		margin-bottom: var(--space-lg);
	}

	.about__features {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-sm);
	}

	.about__feature {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-sm);
	}

	.about__feature-title {
		font-size: 0.9375rem;
		font-weight: 400;
		color: var(--color-text);
		margin-bottom: 0.375rem;
	}

	.about__feature-body {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
		line-height: 1.5;
	}
</style>
