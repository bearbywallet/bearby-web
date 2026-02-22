<script lang="ts">
	import { features } from '$lib/data/features';
</script>

<section id="features" class="features">
	<div class="features__inner">
		<!-- 2×2 security features grid -->
		<ul class="features__grid" role="list">
			{#each features as feature (feature.title)}
				<li class="features__card">
					<h3 class="features__card-title">{feature.title}</h3>
					<p class="features__card-body">{feature.description}</p>
				</li>
			{/each}
		</ul>

		<!-- Large showcase cards: In-app dApps + Native Bitcoin -->
		<div class="showcase">
			<div class="showcase__card showcase__card--dapps">
				<div class="showcase__content">
					<h3 class="showcase__title">In app dApps and browsers</h3>
					<p class="showcase__body">
						Summarize long texts in seconds or generate professional content from scratch. Perfect for
						professionals!
					</p>
				</div>
				<div class="showcase__visual showcase__visual--phone" aria-hidden="true">
					<div class="mock-phone">
						<div class="mock-phone__screen">
							<div class="mock-phone__toolbar">
								<div class="mock-phone__search">dapp.example.com</div>
							</div>
							<div class="mock-phone__content">
								<div class="mock-phone__row" style="width:70%"></div>
								<div class="mock-phone__row" style="width:50%"></div>
								<div class="mock-phone__btn"></div>
								<div class="mock-phone__row" style="width:80%"></div>
								<div class="mock-phone__row" style="width:40%"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="showcase__card showcase__card--bitcoin">
				<div class="showcase__content">
					<h3 class="showcase__title">Native Bitcoin Support</h3>
					<p class="showcase__body">
						Native Bitcoin Support to store and trade your bitcoin securely. Designed to protect assets
						from Quantum risks.
					</p>
				</div>
				<div class="showcase__visual showcase__visual--device" aria-hidden="true">
					<div class="mock-hw">
						<div class="mock-hw__screen"></div>
						<div class="mock-hw__buttons">
							<div class="mock-hw__btn"></div>
							<div class="mock-hw__btn"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.features {
		padding: var(--space-2xl) var(--space-md);
		border-top: 1px solid var(--color-border);
	}

	.features__inner {
		max-width: var(--breakpoint-desktop);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	/* ── 2×2 security grid ── */
	.features__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background-color: var(--color-border);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	@media (max-width: 600px) {
		.features__grid {
			grid-template-columns: 1fr;
		}
	}

	.features__card {
		background: var(--color-bg);
		padding: var(--space-md);
	}

	.features__card-title {
		font-size: 1rem;
		font-weight: 400;
		color: var(--color-text);
		margin-bottom: 0.5rem;
	}

	.features__card-body {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	/* ── Showcase large cards ── */
	.showcase {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-sm);
	}

	@media (max-width: 700px) {
		.showcase {
			grid-template-columns: 1fr;
		}
	}

	.showcase__card {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--space-md);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface);
		min-height: 340px;
	}

	.showcase__title {
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-text);
		line-height: 1.2;
	}

	.showcase__body {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.showcase__visual {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	/* Phone mock */
	.mock-phone {
		width: 160px;
		border-radius: 24px;
		background: #111;
		border: 1px solid #2a2a2a;
		box-shadow: 0 0 40px color-mix(in srgb, var(--color-accent-purple) 20%, transparent);
		overflow: hidden;
	}

	.mock-phone__screen {
		padding: 0.75rem;
		background: #0d0d0d;
	}

	.mock-phone__toolbar {
		background: #1a1a1a;
		border-radius: 8px;
		padding: 0.35rem 0.5rem;
		margin-bottom: 0.5rem;
	}

	.mock-phone__search {
		font-size: 0.55rem;
		color: #555;
		font-family: monospace;
	}

	.mock-phone__content {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.25rem 0;
	}

	.mock-phone__row {
		height: 6px;
		background: #1e1e1e;
		border-radius: 3px;
	}

	.mock-phone__btn {
		height: 22px;
		width: 70%;
		background: var(--color-accent-purple);
		border-radius: 6px;
		opacity: 0.7;
		margin: 0.2rem 0;
	}

	/* HW device mock */
	.mock-hw {
		width: 140px;
		height: 190px;
		border-radius: 16px;
		background: #1a1a1a;
		border: 1px solid #2a2a2a;
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
	}

	.mock-hw__screen {
		width: 100%;
		height: 80px;
		background: #111;
		border-radius: 8px;
		border: 1px solid #333;
	}

	.mock-hw__buttons {
		display: flex;
		gap: 0.5rem;
	}

	.mock-hw__btn {
		width: 28px;
		height: 10px;
		border-radius: 5px;
		background: #333;
	}
</style>
