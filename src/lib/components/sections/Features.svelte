<script lang="ts">
	import { features } from '$lib/data/features';
</script>

<section id="features" class="features">
	<div class="features__inner">
		<ul class="features__grid" role="list">
			{#each features as feature (feature.title)}
				<li class="features__card">
					<h3 class="features__card-title">{feature.title}</h3>
					<p class="features__card-body">{feature.description}</p>
				</li>
			{/each}
		</ul>

		<div class="showcase">
			<div class="showcase__card showcase__card--dapps">
				<div class="showcase__content">
					<h3 class="showcase__title">In app dApps and browsers</h3>
					<p class="showcase__body">
						Access decentralized applications directly within Bearby. Browse, connect, and interact
						with dApps seamlessly without leaving your wallet.
					</p>
				</div>
				<div class="showcase__visual" aria-hidden="true">
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
						Native Bitcoin Support to store and trade your bitcoin securely. Designed to protect
						assets from Quantum risks.
					</p>
				</div>
				<div class="showcase__visual" aria-hidden="true">
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
		padding: 100px 20px;
		background: #000;
	}

	.features__inner {
		max-width: 1140px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.features__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: rgba(230, 230, 230, 0.1);
		border-radius: 24px;
		overflow: hidden;
		border: 1px solid rgba(230, 230, 230, 0.1);
	}

	@media (max-width: 600px) {
		.features__grid {
			grid-template-columns: 1fr;
		}
	}

	.features__card {
		background: #000;
		padding: 24px;
		transition: background 0.2s;
	}

	.features__card:hover {
		background: rgba(250, 250, 250, 0.02);
	}

	.features__card-title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 400;
		color: var(--color-text);
		margin: 0 0 8px 0;
	}

	.features__card-body {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.showcase {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	@media (max-width: 700px) {
		.showcase {
			grid-template-columns: 1fr;
		}
	}

	.showcase__card {
		border-radius: 32px;
		padding: 24px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 24px;
		background: rgba(250, 250, 250, 0.05);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(230, 230, 230, 0.1);
		min-height: 340px;
	}

	.showcase__content {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.showcase__title {
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-text);
		line-height: 1.2;
		margin: 0;
	}

	.showcase__body {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.showcase__visual {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.mock-phone {
		width: 160px;
		border-radius: 24px;
		background: #111;
		border: 1px solid rgba(250, 250, 250, 0.1);
		box-shadow: 0 0 40px rgba(172, 89, 255, 0.15);
		overflow: hidden;
	}

	.mock-phone__screen {
		padding: 12px;
		background: #0d0d0d;
	}

	.mock-phone__toolbar {
		background: #1a1a1a;
		border-radius: 8px;
		padding: 6px 8px;
		margin-bottom: 8px;
	}

	.mock-phone__search {
		font-size: 0.55rem;
		color: #555;
		font-family: monospace;
	}

	.mock-phone__content {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 4px 0;
	}

	.mock-phone__row {
		height: 6px;
		background: #1e1e1e;
		border-radius: 3px;
	}

	.mock-phone__btn {
		height: 22px;
		width: 70%;
		background: linear-gradient(135deg, #e8006f 0%, #ac59ff 100%);
		border-radius: 6px;
		opacity: 0.8;
		margin: 4px 0;
	}

	.mock-hw {
		width: 140px;
		height: 190px;
		border-radius: 16px;
		background: #1a1a1a;
		border: 1px solid rgba(250, 250, 250, 0.1);
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		padding: 16px;
	}

	.mock-hw__screen {
		width: 100%;
		height: 80px;
		background: #111;
		border-radius: 8px;
		border: 1px solid rgba(250, 250, 250, 0.1);
	}

	.mock-hw__buttons {
		display: flex;
		gap: 8px;
	}

	.mock-hw__btn {
		width: 28px;
		height: 10px;
		border-radius: 5px;
		background: #333;
	}
</style>
