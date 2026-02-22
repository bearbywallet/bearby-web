<script lang="ts">
	import { browser } from '$app/environment';
	import { toggleTheme } from '$lib/stores/theme';

	function handleToggle() {
		if (!browser) return;
		toggleTheme();
	}
</script>

<button class="theme-toggle" onclick={handleToggle} aria-label="Toggle color theme">
	<!-- Sun: visible in dark mode (default) — click to go light -->
	<svg class="icon icon--sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<circle cx="12" cy="12" r="5" />
		<line x1="12" y1="1" x2="12" y2="3" />
		<line x1="12" y1="21" x2="12" y2="23" />
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
		<line x1="1" y1="12" x2="3" y2="12" />
		<line x1="21" y1="12" x2="23" y2="12" />
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	</svg>
	<!-- Moon: visible in light mode — click to go dark -->
	<svg class="icon icon--moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
	<span class="theme-label" aria-hidden="true">
		<!-- "Light" label shown in dark mode, "Dark" in light mode -->
		<span class="label--light">Light</span>
		<span class="label--dark">Dark</span>
	</span>
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		border-radius: var(--radius-md);
		background: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: 0.8125rem;
		transition:
			color 0.2s,
			border-color 0.2s;
	}

	.theme-toggle:hover {
		color: var(--color-text);
		border-color: var(--color-text-muted);
	}

	.icon {
		display: none;
		flex-shrink: 0;
	}

	/* Dark mode (default): show sun + "Light" label */
	.icon--sun {
		display: block;
	}

	.label--dark {
		display: none;
	}

	.label--light {
		display: inline;
	}

	/* Light mode overrides */
	:global([data-theme='light']) .icon--sun {
		display: none;
	}

	:global([data-theme='light']) .icon--moon {
		display: block;
	}

	:global([data-theme='light']) .label--light {
		display: none;
	}

	:global([data-theme='light']) .label--dark {
		display: inline;
	}
</style>
