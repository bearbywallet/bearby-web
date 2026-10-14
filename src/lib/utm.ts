/**
 * utm_source capture for the Bearby Card waitlist (source-only links).
 *
 * The source is read once on landing, sanitized, and kept in first-party
 * storage until signup. The FIRST source wins: later visits with a different
 * tag never overwrite it.
 */

const STORAGE_KEY = 'bearby_utm_source';
const MAX_LEN = 32;

function sanitize(raw: string): string {
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

		const source = sanitize(raw);

		if (!source) return;
		if (!localStorage.getItem(STORAGE_KEY)) localStorage.setItem(STORAGE_KEY, source);
	} catch {
		// Storage can be unavailable (private mode); the signup still works.
	}
}

/** The persisted source, or an empty string (= direct_or_unattributed). */
export function stored_utm_source(): string {
	if (typeof window === 'undefined') return '';

	try {
		return localStorage.getItem(STORAGE_KEY) ?? '';
	} catch {
		return '';
	}
}
