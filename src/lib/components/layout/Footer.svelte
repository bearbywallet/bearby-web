<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<!-- Giant background wordmark -->
	<div class="footer__wordmark" aria-hidden="true">Bearby</div>

	<div class="footer__bar">
		<div class="footer__bar-inner">
			<a href="/privacy-policy" class="footer__link">Privacy Policy</a>

			<p class="footer__copy">©{year} Zilpay ®</p>

			<p class="footer__credit">Developed and Maintained by Rinat Khasanshin</p>

			<a href="https://github.com/zilpay" class="footer__link" target="_blank" rel="noopener noreferrer">
				Old Bearby
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--color-border);
		margin-top: 0;
	}

	/* Giant "Bearby" watermark text */
	.footer__wordmark {
		font-family: var(--font-heading);
		font-size: clamp(120px, 20vw, 260px);
		font-weight: 400;
		line-height: 0.85;
		letter-spacing: -0.04em;
		color: var(--color-text);
		text-align: center;
		padding: var(--space-xl) var(--space-md) 0;
		user-select: none;
		pointer-events: none;
	}

	/* Bottom bar */
	.footer__bar {
		border-top: 1px solid var(--color-border);
		padding: var(--space-sm) var(--space-md);
	}

	.footer__bar-inner {
		max-width: var(--breakpoint-desktop);
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm);
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
	}

	.footer__credit {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
		margin-left: auto;
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
