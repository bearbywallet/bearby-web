import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { API_URL } from '$lib/constants';

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

export const handle: Handle = sequence(handleFarmHost, handleSecurity, handleParaglide);
