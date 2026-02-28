<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<section class="showcases">
	<div class="container">
		<div class="cards">
			<div class="card card--tall">
				<div class="text-wrap">
					<h3>{m.showcase_dapps_title()}</h3>
					<p>{m.showcase_dapps_desc()}</p>
				</div>
				<div class="image-wrap">
					<img
						src="/img/phone-dapps-vertical.webp"
						alt="In app dApps browser"
						loading="lazy"
						width="1667"
						height="2268"
					/>
				</div>
			</div>
			<div class="card card--stretch">
				<div class="text-wrap">
					<h3>{m.showcase_bitcoin_title()}</h3>
					<p>{m.showcase_bitcoin_desc()}</p>
				</div>
				<div class="image-wrap">
					<img
						src="/img/phone-bitcoin.webp"
						alt="Native Bitcoin Support"
						loading="lazy"
						width="1652"
						height="2048"
					/>
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
	}

	.card {
		flex: 1 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
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

	.text-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 0 20px;
		text-align: center;
		flex-shrink: 0;
	}

	.image-wrap {
		position: relative;
		width: 100%;
		max-width: 450px;
		overflow: hidden;
		flex: 1 1 auto;
		min-height: 0;
	}

	.image-wrap img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center top;
	}

	h3 {
		font-family: var(--font-secondary);
		font-size: clamp(24px, 4vw, 52px);
		font-weight: 600;
		line-height: 1.2em;
		color: var(--text-primary);
	}

	p {
		font-family: var(--font-secondary);
		font-size: clamp(14px, 2.5vw, 18px);
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
			padding: 30px 20px;
			border-radius: 24px;
		}

		.image-wrap {
			max-width: 280px;
			flex: 0 1 auto;
			max-height: 400px;
		}

		h3 {
			font-size: 24px;
		}

		p {
			font-size: 14px;
		}
	}
</style>
