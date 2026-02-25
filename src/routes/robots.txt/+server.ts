export const prerender = true;

import { SITE_URL } from '$lib/constants';

export async function GET() {
	const robots = `
User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`.trim();

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
