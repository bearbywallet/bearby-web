<script lang="ts">
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
</script>

<nav class="nav" aria-label="Main navigation">
	<div class="nav__inner">
		<!-- Logo -->
		<a href="/" class="nav__logo" aria-label="Bearby — home">
			<svg class="nav__flame" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<defs>
					<radialGradient id="flame-grad" cx="50%" cy="80%" r="60%">
						<stop offset="0%" stop-color="#e8006f" />
						<stop offset="60%" stop-color="#ac59ff" />
						<stop offset="100%" stop-color="#6c30e0" />
					</radialGradient>
				</defs>
				<path d="M18 2C18 2 28 10 28 20C28 25.5 23.5 30 18 30C12.5 30 8 25.5 8 20C8 16 10 13 12 11C12 14 13.5 16 16 17C14 14 15 9 18 2Z" fill="url(#flame-grad)" />
				<path d="M18 20C18 20 22 17 22 14C22 13 21.5 12 21 11.5C21 13 20 14.5 18 15.5C19 13.5 18.5 11 17 9C16 12 16 14 16 15.5C14.5 14.5 13.5 13 13.5 11C13 12 12.5 13 12.5 14C12.5 17 15 20 18 20Z" fill="white" fill-opacity="0.4" />
			</svg>
			<span class="nav__logo-text">Bearby</span>
		</a>

		<!-- Links -->
		<ul class="nav__links" role="list">
			<li><a href="/#about" class="nav__link">About</a></li>
			<li><a href="/#features" class="nav__link">Features</a></li>
			<li>
				<a href="https://github.com/zilpay" class="nav__link" target="_blank" rel="noopener noreferrer">
					Github(Web)
				</a>
			</li>
		</ul>

		<!-- Actions -->
		<div class="nav__actions">
			<a href="/#downloads" class="nav__download">Download</a>
			<ThemeToggle />
		</div>
	</div>
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 100;
		height: var(--nav-height);
		background-color: color-mix(in srgb, var(--color-bg) 90%, transparent);
		backdrop-filter: blur(16px);
		border-bottom: 1px solid var(--color-border);
	}

	.nav__inner {
		max-width: var(--breakpoint-desktop);
		margin: 0 auto;
		padding: 0 var(--space-md);
		height: 100%;
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.nav__logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 400;
		color: var(--color-text);
		flex-shrink: 0;
		text-decoration: none;
	}

	.nav__flame {
		width: 28px;
		height: 28px;
	}

	.nav__logo-text {
		letter-spacing: -0.01em;
	}

	.nav__links {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		margin-left: var(--space-sm);
		flex: 1;
	}

	.nav__link {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		transition: color 0.2s;
		text-decoration: none;
	}

	.nav__link:hover {
		color: var(--color-text);
	}

	.nav__actions {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		margin-left: auto;
	}

	.nav__download {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		padding: 0.375rem 0.75rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		transition: color 0.2s, border-color 0.2s;
		text-decoration: none;
	}

	.nav__download:hover {
		color: var(--color-text);
		border-color: var(--color-text-muted);
	}

	@media (max-width: 600px) {
		.nav__links {
			display: none;
		}

		.nav__download {
			display: none;
		}
	}
</style>
