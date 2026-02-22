import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

export function toggleTheme(): void {
	if (!browser) return;
	const current = document.documentElement.getAttribute('data-theme');
	// dark is default — toggling dark→light, light→dark
	const next: Theme = current === 'light' ? 'dark' : 'light';
	document.documentElement.setAttribute('data-theme', next);
	try {
		localStorage.setItem('theme', next);
	} catch {
		// ignore in private browsing
	}
}

export function currentTheme(): Theme {
	if (!browser) return 'dark';
	const val = document.documentElement.getAttribute('data-theme');
	return val === 'light' ? 'light' : 'dark';
}
