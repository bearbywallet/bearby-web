<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { getTheme, toggleTheme } from '$lib/stores/theme.svelte';
	import * as m from '$lib/paraglide/messages';
	import LocaleSwitcher from './LocaleSwitcher.svelte';
</script>

<nav class="nav" aria-label="Main navigation">
	<div class="nav-container">
		<a href="/#hero-header" class="nav-logo" aria-label="Bearby — home">
			<img src={logo} alt="Bearby" class="nav-icon" />
			<span class="nav-logo-text">Bearby</span>
		</a>

		<div class="nav-links">
			<a href="/#about" class="nav-link">{m.nav_about()}</a>
			<a href="/#features" class="nav-link">{m.nav_features()}</a>
			<a href="/#secure" class="nav-link">{m.nav_security()}</a>
			<a href="/#integrations" class="nav-link">{m.nav_integrations()}</a>
		</div>

		<div class="nav-actions">
			<LocaleSwitcher />
			<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
				{#if getTheme() === 'dark'}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
		max-width: 1000px;
		padding: 0 24px;
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding: 12px 16px 12px 24px;
		background: var(--bg-nav);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 40px;
		border: 1px solid var(--border-color);
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
		background: var(--bg-subtle);
		border: 1px solid var(--border-color);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s;
	}

	.theme-toggle:hover {
		background: var(--bg-card-hover);
		border-color: var(--border-hover);
	}

	.nav-download {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.875rem;
		color: var(--text-primary);
		padding: 10px 24px;
		border-radius: 40px;
		background: var(--border-color);
		border: 1px solid var(--border-hover);
		text-decoration: none;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.nav-download:hover {
		background: var(--border-hover);
		border-color: var(--border-hover);
	}

	@media (max-width: 900px) {
		.nav {
			top: 0;
			padding: 0;
		}
		.nav-container {
			border-radius: 0;
			flex-wrap: wrap;
			justify-content: center;
		}
		.nav-links {
			display: none;
		}
	}
</style>
