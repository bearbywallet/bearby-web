<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-giant">Bearby</div>

		<div class="footer-bottom">
			<div class="footer-links-left">
				<a href="/privacy-policy" class="footer-link">{m.footer_privacy()}</a>
				<span class="footer-copy">{m.footer_copyright({ year: String(year) })}</span>
			</div>

			<div class="footer-links-right">
				<a
					href="https://github.com/zilpay"
					target="_blank"
					rel="noopener noreferrer"
					class="footer-link">{m.footer_github()}</a
				>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: 0 0 48px 0;
		overflow: hidden;
	}

	.footer-giant {
		font-size: clamp(4rem, 15vw, 16rem);
		font-weight: 500;
		line-height: 0.8;
		color: var(--text-primary);
		text-align: center;
		letter-spacing: -0.04em;
		margin-bottom: 64px;
		font-family: var(--font-primary);
	}

	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid var(--border-color);
		padding-top: 24px;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.footer-links-left,
	.footer-links-right {
		display: flex;
		gap: 32px;
	}

	.footer-link {
		color: var(--text-secondary);
		transition: color 0.2s;
	}

	.footer-link:hover {
		color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.footer-bottom {
			flex-direction: column;
			gap: 16px;
			text-align: center;
		}
		.footer-links-left,
		.footer-links-right {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
