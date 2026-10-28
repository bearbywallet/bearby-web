import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { API_URL } from '$lib/constants';
import { REF_COOKIE, UTM_COOKIE, sanitize_source } from '$lib/utm';

const SECURITY_HEADERS: Record<string, string> = {
	'X-Frame-Options': 'SAMEORIGIN',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
	'X-XSS-Protection': '1; mode=block',
	'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
	'Content-Security-Policy':
		`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' ${API_URL};`
};

// The farm page lives at `/farm` but its own hostnames should land there from `/`.
const FARM_HOSTS = ['farm.bearby.ru', 'farm.bearby.io'];

const handleFarmHost: Handle = ({ event, resolve }) => {
	// Read the request header rather than `event.url.host`: with `ORIGIN` set the
	// URL origin is pinned to the canonical site and the real host would be lost.
	const forwarded = event.request.headers.get('x-forwarded-host') ?? '';
	const host = (forwarded || event.request.headers.get('host') || '')
		.split(',')[0]
		.trim()
		.replace(/:\d+$/, '')
		.toLowerCase();
	if (FARM_HOSTS.includes(host) && event.url.pathname === '/') {
		redirect(307, '/farm');
	}
	return resolve(event);
};

const handleSecurity: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		response.headers.set(key, value);
	}
	return response;
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		const theme = event.cookies.get('theme') === 'dark' ? 'dark' : 'light';

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('data-theme="light"', `data-theme="${theme}"`)
		});
	});

// Landing attribution: remember where the visitor came from so the waitlist
// form can attach the source to the email. The external waitlist API never
// sees these cookies — the client reads them and sends `source` in the JSON.
const cookie_options = (event: RequestEvent) => ({
	path: '/',
	maxAge: 60 * 60 * 24 * 90,
	sameSite: 'lax' as const,
	// A `secure` cookie would be silently dropped on http (dev servers).
	// `httpOnly: false` is required: the waitlist form reads it via
	// document.cookie to send `source` in the signup JSON (no secrets here).
	secure: event.url.protocol === 'https:',
	httpOnly: false
});

// Well-known referrer hosts whose bare first label would be misleading.
const REFERRER_ALIASES: Record<string, string> = {
	'l.facebook.com': 'facebook',
	'lm.facebook.com': 'facebook',
	'lnkd.in': 'linkedin',
	'out.reddit.com': 'reddit',
	't.co': 'twitter',
	't.me': 'telegram',
	'telegram.me': 'telegram',
	'x.com': 'twitter'
};

function referer_host(referer: string): string {
	try {
		return new URL(referer).hostname.replace(/^www\./, '');
	} catch {
		return '';
	}
}

function request_host(event: RequestEvent): string {
	// Same reasoning as `handleFarmHost` above: read the headers, `event.url`
	// may be pinned to the canonical origin.
	const forwarded = event.request.headers.get('x-forwarded-host') ?? '';
	return (forwarded || event.request.headers.get('host') || '')
		.split(',')[0]
		.trim()
		.replace(/:\d+$/, '')
		.toLowerCase();
}

const handleUtmCookie: Handle = ({ event, resolve }) => {
	const { cookies, url } = event;

	// An explicit utm_source is the strongest signal and sticks first-write:
	// the original campaign attribution is never overwritten.
	const utm = sanitize_source(url.searchParams.get('utm_source'));
	if (utm) {
		if (!cookies.get(UTM_COOKIE)) cookies.set(UTM_COOKIE, utm, cookie_options(event));
	} else if (!cookies.get(UTM_COOKIE) && !cookies.get(REF_COOKIE)) {
		// Untagged landing: fall back to the external Referer origin.
		const raw = event.request.headers.get('referer');
		const host = raw ? referer_host(raw) : '';
		if (host && host !== request_host(event)) {
			const source = sanitize_source(REFERRER_ALIASES[host] ?? host.split('.')[0] ?? '');
			if (source) cookies.set(REF_COOKIE, source, cookie_options(event));
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(
	handleFarmHost,
	handleSecurity,
	handleUtmCookie,
	handleParaglide
);
