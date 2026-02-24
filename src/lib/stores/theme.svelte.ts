import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

let theme = $state<Theme>('light');

function setCookie(value: Theme): void {
	document.cookie = `theme=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function initTheme(serverTheme: Theme): void {
	theme = serverTheme;
	if (!browser) return;
	// No cookie yet — detect system preference and persist
	const hasCookie = document.cookie.match(/(?:^|;\s*)theme=(light|dark)/);
	if (!hasCookie) {
		const detected: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
		theme = detected;
		document.documentElement.setAttribute('data-theme', detected);
		setCookie(detected);
	}
}

export function getTheme(): Theme {
	return theme;
}

export function toggleTheme(): void {
	theme = theme === 'dark' ? 'light' : 'dark';
	if (!browser) return;
	document.documentElement.setAttribute('data-theme', theme);
	setCookie(theme);
}
