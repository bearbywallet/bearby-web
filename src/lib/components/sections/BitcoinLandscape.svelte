<section class="landscape">
	<div class="container">
		<div class="card">
			<img src="/img/hero-phone-dark.png" alt="Bitcoin landscape" />
		</div>
	</div>
</section>

<style>
	.landscape {
		padding-bottom: 8px;
	}

	.card {
		position: relative;
		width: 100%;
		min-height: 600px;
		max-height: 600px;
		border-radius: var(--card-radius);
		border: 1px solid var(--gray-900);
		overflow: hidden;
	}

	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}

	@media (max-width: 809px) {
		.card {
			min-height: 240px;
			max-height: 240px;
			border-radius: var(--border-radius-xl);
		}
	}
</style>
