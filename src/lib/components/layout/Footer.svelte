<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer__wordmark" aria-hidden="true">
		<img src={logo} alt="" class="footer__logo" />
		Bearby
	</div>

	<div class="footer__bar">
		<div class="footer__bar-inner">
			<a href="/privacy-policy" class="footer__link">Privacy Policy</a>

			<p class="footer__copy">©{year} Zilpay ®</p>

			<p class="footer__credit">Developed and Maintained by Rinat Khasanshin</p>

			<a
				href="https://github.com/zilpay"
				class="footer__link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Old Bearby
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		overflow: hidden;
		background: #000;
	}

	.footer__wordmark {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		font-family: var(--font-heading);
		font-size: clamp(80px, 15vw, 180px);
		font-weight: 400;
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: rgba(250, 250, 250, 0.05);
		text-align: center;
		padding: 60px 20px 0;
		user-select: none;
		pointer-events: none;
	}

	.footer__logo {
		width: clamp(60px, 10vw, 120px);
		height: clamp(60px, 10vw, 120px);
		opacity: 0.1;
		object-fit: contain;
	}

	.footer__bar {
		border-top: 1px solid rgba(230, 230, 230, 0.1);
		padding: 16px 20px;
		margin-top: 40px;
	}

	.footer__bar-inner {
		max-width: 1140px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px;
	}

	.footer__link {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer__link:hover {
		color: var(--color-text);
	}

	.footer__copy {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
		margin: 0;
	}

	.footer__credit {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
		margin: 0 0 0 auto;
	}

	@media (max-width: 600px) {
		.footer__bar-inner {
			justify-content: center;
		}

		.footer__credit {
			margin-left: 0;
			text-align: center;
			width: 100%;
		}
	}
</style>
