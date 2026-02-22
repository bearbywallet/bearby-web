<script lang="ts">
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import logo from '$lib/assets/logo.svg';
</script>

<nav class="nav" aria-label="Main navigation">
	<div class="nav__container">
		<a href="/#hero-header" class="nav__logo" aria-label="Bearby — home">
			<img src={logo} alt="Bearby" class="nav__icon" />
			<span class="nav__logo-text">Bearby</span>
		</a>

		<div class="nav__links">
			<a href="/#about" class="nav__link">About</a>
			<a href="/#features" class="nav__link">Features</a>
			<a
				href="https://github.com/zilpay"
				class="nav__link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Github(Web)
			</a>
			<a href="/privacy-policy" class="nav__link">Privacy Policy</a>
		</div>

		<div class="nav__actions">
			<a href="/#downloads" class="nav__download">
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="7,10 12,15 17,10" />
					<line x1="12" y1="15" x2="12" y2="3" />
				</svg>
				Download
			</a>
			<ThemeToggle />
		</div>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		width: 100%;
		max-width: 1140px;
		padding: 0 20px;
	}

	.nav__container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding: 14px 20px;
		background: rgba(0, 0, 0, 0);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 33px;
		border: 1px solid rgba(250, 250, 250, 0.05);
	}

	.nav__logo {
		display: flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 400;
		color: var(--color-text);
		flex-shrink: 0;
		text-decoration: none;
	}

	.nav__icon {
		width: 32px;
		height: 32px;
	}

	.nav__logo-text {
		letter-spacing: -0.01em;
	}

	.nav__links {
		display: flex;
		align-items: center;
		gap: 30px;
	}

	.nav__link {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		transition: color 0.2s;
		text-decoration: none;
		white-space: nowrap;
	}

	.nav__link:hover {
		color: var(--color-text);
	}

	.nav__actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.nav__download {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.875rem;
		color: var(--color-text);
		padding: 10px 20px;
		border-radius: 33px;
		background: rgba(250, 250, 250, 0.05);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(230, 230, 230, 0.1);
		text-decoration: none;
		transition:
			background 0.2s,
			border-color 0.2s;
		white-space: nowrap;
	}

	.nav__download:hover {
		background: rgba(250, 250, 250, 0.1);
		border-color: rgba(230, 230, 230, 0.2);
	}

	@media (max-width: 809px) {
		.nav {
			top: 0;
			max-width: 100%;
			padding: 0;
		}

		.nav__container {
			flex-direction: column;
			gap: 10px;
			padding: 14px;
			border-radius: 0;
		}

		.nav__links {
			flex-wrap: wrap;
			justify-content: center;
			gap: 20px;
		}

		.nav__actions {
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.nav__links {
			display: none;
		}
	}
</style>
