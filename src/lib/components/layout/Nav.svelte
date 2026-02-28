<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { getTheme, toggleTheme } from '$lib/stores/theme.svelte';
	import * as m from '$lib/paraglide/messages';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}

	function handleOverlayClick() {
		closeMenu();
	}
</script>

<nav class="nav" aria-label="Main navigation">
	<div class="nav-container">
		<a href="/#hero-header" class="nav-logo" aria-label="Bearby — home">
			<img src={logo} alt="Bearby" class="nav-icon" width="24" height="24" />
			<span class="nav-logo-text">Bearby</span>
		</a>

		<div class="nav-links">
			<a href="/#about" class="nav-link">{m.nav_about()}</a>
			<a href="/#features" class="nav-link">{m.nav_features()}</a>
			<a href="/#secure" class="nav-link">{m.nav_security()}</a>
			<a href="/#integrations" class="nav-link">{m.nav_integrations()}</a>
		</div>

		<div class="nav-actions">
			<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
				{#if getTheme() === 'dark'}
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="5"></circle>
						<line x1="12" y1="1" x2="12" y2="3"></line>
						<line x1="12" y1="21" x2="12" y2="23"></line>
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
						<line x1="1" y1="12" x2="3" y2="12"></line>
						<line x1="21" y1="12" x2="23" y2="12"></line>
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
					</svg>
				{:else}
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
					</svg>
				{/if}
			</button>
			<a href="/#downloads" class="nav-download">
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
					><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline
						points="7,10 12,15 17,10"
					></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg
				>
				{m.nav_download()}
			</a>
			<button
				class="hamburger"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
			>
				<span class="hamburger-line" class:open={menuOpen}></span>
				<span class="hamburger-line" class:open={menuOpen}></span>
				<span class="hamburger-line" class:open={menuOpen}></span>
			</button>
		</div>
	</div>
</nav>

{#if menuOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="mobile-overlay" onclick={handleOverlayClick} onkeydown={() => {}}></div>
	<div class="mobile-menu">
		<a href="/#about" class="mobile-link" onclick={closeMenu}>{m.nav_about()}</a>
		<a href="/#features" class="mobile-link" onclick={closeMenu}>{m.nav_features()}</a>
		<a href="/#secure" class="mobile-link" onclick={closeMenu}>{m.nav_security()}</a>
		<a href="/#integrations" class="mobile-link" onclick={closeMenu}>{m.nav_integrations()}</a>
		<a href="/#downloads" class="mobile-link" onclick={closeMenu}>{m.nav_download()}</a>
	</div>
{/if}

<style>
	.nav {
		position: fixed;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		width: 100%;
		max-width: 1000px;
		padding: 0 24px;
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding: 12px 16px 12px 24px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-radius: 40px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.12),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
	}

	:global([data-theme='light']) .nav-container {
		background: rgba(255, 255, 255, 0.45);
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.06),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	.nav-logo {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		text-decoration: none;
	}

	.nav-icon {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.nav-link {
		font-size: 0.875rem;
		color: var(--text-secondary);
		transition: color 0.2s;
		text-decoration: none;
		white-space: nowrap;
	}

	.nav-link:hover {
		color: var(--text-primary);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s;
	}

	:global([data-theme='light']) .theme-toggle {
		background: rgba(255, 255, 255, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.5);
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.25);
	}

	:global([data-theme='light']) .theme-toggle:hover {
		background: rgba(255, 255, 255, 0.55);
		border-color: rgba(255, 255, 255, 0.7);
	}

	.nav-download {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.875rem;
		color: var(--text-primary);
		padding: 10px 24px;
		border-radius: 40px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.15);
		text-decoration: none;
		transition: all 0.2s;
		white-space: nowrap;
	}

	:global([data-theme='light']) .nav-download {
		background: rgba(255, 255, 255, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.55);
	}

	.nav-download:hover {
		background: rgba(255, 255, 255, 0.18);
		border-color: rgba(255, 255, 255, 0.25);
	}

	:global([data-theme='light']) .nav-download:hover {
		background: rgba(255, 255, 255, 0.6);
		border-color: rgba(255, 255, 255, 0.75);
	}

	/* Hamburger button */
	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		cursor: pointer;
		padding: 0;
		transition: all 0.2s;
	}

	:global([data-theme='light']) .hamburger {
		background: rgba(255, 255, 255, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.5);
	}

	.hamburger-line {
		display: block;
		width: 18px;
		height: 2px;
		background: var(--text-primary);
		border-radius: 2px;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	.hamburger-line.open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger-line.open:nth-child(2) {
		opacity: 0;
	}

	.hamburger-line.open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Mobile overlay & menu */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		z-index: 99;
		background: rgba(0, 0, 0, 0.5);
	}

	.mobile-menu {
		position: fixed;
		top: 70px;
		left: 0;
		right: 0;
		z-index: 101;
		display: none;
		flex-direction: column;
		gap: 4px;
		padding: 8px;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
	}

	:global([data-theme='light']) .mobile-menu {
		background: rgba(255, 255, 255, 0.45);
		border-bottom: 1px solid rgba(255, 255, 255, 0.6);
	}

	.mobile-link {
		display: block;
		padding: 14px 20px;
		font-size: 1rem;
		color: var(--text-primary);
		text-decoration: none;
		border-radius: 16px;
		transition: background 0.2s;
	}

	.mobile-link:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	:global([data-theme='light']) .mobile-link:hover {
		background: rgba(255, 255, 255, 0.4);
	}

	@media (max-width: 900px) {
		.nav {
			top: 0;
			padding: 0;
		}
		.nav-container {
			border-radius: 0;
		}
		.nav-links {
			display: none;
		}
		.hamburger {
			display: flex;
		}
		.mobile-menu {
			display: flex;
		}
	}
</style>
