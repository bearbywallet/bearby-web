/**
 * utm_source capture for the Bearby Card waitlist (source-only links).
 *
 * The primary capture is server-side: `hooks.server.ts` writes the source
 * into a first-party cookie on landing (utm tag first, external Referer as
 * a fallback, both first-write-wins). The client only READS the cookies at
 * signup time; the legacy localStorage entry below keeps returning visitors
 * attributed.
 */

export const UTM_COOKIE = 'bearby_utm_source';
export const REF_COOKIE = 'bearby_ref_source';

const STORAGE_KEY = 'bearby_utm_source'; // legacy pre-cookie storage
const MAX_LEN = 32;

/** Keeps only a-z0-9_- and caps the length (safe for cookie/JSON/DB). */
export function sanitize_source(raw: string | null | undefined): string {
	if (!raw) return '';

	return raw
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9_-]/g, '')
		.slice(0, MAX_LEN);
}

/** Reads ?utm_source from the current URL and stores it if we have none yet. */
export function capture_utm_source(): void {
	if (typeof window === 'undefined') return;

	try {
		const raw = new URLSearchParams(window.location.search).get('utm_source');

		if (!raw) return;

		const source = sanitize_source(raw);

		if (!source) return;
		if (!localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, source);
	} catch {
		// Storage can be unavailable (private mode); the signup still works.
	}
}

function read_cookie(name: string): string {
	const pair = document.cookie.split('; ').find((c) => c.startsWith(name + '='));
	return pair ? pair.slice(name.length + 1) : '';
}

/** utm cookie → referer cookie → legacy localStorage, or '' (= direct). */
export function stored_utm_source(): string {
	if (typeof window === 'undefined') return '';

	try {
		return (
			read_cookie(UTM_COOKIE) ||
			read_cookie(REF_COOKIE) ||
			localStorage.getItem(STORAGE_KEY) ||
			''
		);
	} catch {
		return '';
	}
}
