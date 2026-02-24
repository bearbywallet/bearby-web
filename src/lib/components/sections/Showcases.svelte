<section class="showcases">
	<div class="container">
		<div class="cards">
			<div class="card card--tall">
				<div class="image-wrap">
					<img src="/img/phone-dapps-vertical.png" alt="In app dApps browser" />
				</div>
				<div class="text-wrap">
					<h3>In app dApps and browsers</h3>
					<p>Summarize long texts in seconds or generate professional content from scratch. Perfect for professionals!</p>
				</div>
			</div>
			<div class="card card--stretch">
				<div class="image-wrap">
					<img src="/img/phone-bitcoin.png" alt="Native Bitcoin Support" />
				</div>
				<div class="text-wrap">
					<h3>Native Bitcoin Support</h3>
					<p>Native Bitcoin Support to store and trade your bitcoin securely. Designed to protect assets from Quantum risks.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.showcases {
		padding-bottom: 8px;
	}

	.cards {
		display: flex;
		flex-direction: row;
		gap: 10px;
		overflow: hidden;
	}

	.card {
		flex: 1 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 30px;
		padding: 50px 20px;
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		overflow: hidden;
	}

	.card--tall {
		height: 813px;
	}

	.card--stretch {
		align-self: stretch;
	}

	.image-wrap {
		position: relative;
		width: 100%;
		max-width: 450px;
		aspect-ratio: 1;
		overflow: hidden;
		flex: 1 0 0;
	}

	.image-wrap img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center top;
		max-width: none;
	}

	.text-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 20px;
		text-align: center;
	}

	h3 {
		font-family: var(--font-secondary);
		font-size: 52px;
		font-weight: 600;
		line-height: 1.2em;
		letter-spacing: 0em;
		color: var(--text-primary);
	}

	p {
		font-family: var(--font-secondary);
		font-size: 18px;
		font-weight: 400;
		line-height: 1.4em;
		color: var(--text-secondary);
	}

	@media (max-width: 809px) {
		.cards {
			flex-direction: column;
		}

		.card--tall {
			height: auto;
		}

		.card {
			padding: 50px 30px;
		}

		.image-wrap {
			max-width: 320px;
		}

		h3 {
			font-size: 30px;
		}

		p {
			font-size: 16px;
		}
	}
</style>
