<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { socialLinks } from '$lib/assets/icons';

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-giant">Bearby</div>

		<div class="footer-bottom">
			<div class="footer-links-left">
				<a href="/privacy-policy" class="footer-link">{m.footer_privacy()}</a>
				<a href="mailto:contact@bearby.io" class="footer-link">{m.footer_contact()}</a>
				<span class="footer-copy">{m.footer_copyright({ year: String(year) })}</span>
			</div>

			<div class="footer-links-right">
				{#each socialLinks as { name, href, path, viewBox }}
					<a {href} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={name}>
						<svg {viewBox} fill="currentColor" aria-hidden="true" class="social-icon">
							<path d={path} />
						</svg>
					</a>
				{/each}
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
		align-items: center;
		gap: 16px;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: var(--text-primary);
		transition: all 0.2s;
	}

	:global([data-theme='light']) .social-link {
		background: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.social-link:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.25);
	}

	:global([data-theme='light']) .social-link:hover {
		background: rgba(0, 0, 0, 0.08);
		border-color: rgba(0, 0, 0, 0.15);
	}

	.social-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
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
		.footer-links-left {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
