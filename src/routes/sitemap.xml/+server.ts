export const prerender = true;

import { SITE_URL } from '$lib/constants';

export async function GET() {
	const pages = [
		{ path: '', priority: '1.0', changefreq: 'daily' },
		{ path: '/privacy-policy', priority: '0.8', changefreq: 'weekly' },
		{ path: '/ru/', priority: '1.0', changefreq: 'daily' },
		{ path: '/ru/privacy-policy', priority: '0.8', changefreq: 'weekly' }
	];

	const today = new Date().toISOString().split('T')[0];

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="https://www.w3.org/1999/xhtml"
	xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
${pages
	.map((page) => {
		const enUrl = page.path.startsWith('/ru')
			? SITE_URL + page.path.replace(/^\/ru/, '')
			: SITE_URL + page.path;
		const ruUrl = page.path.startsWith('/ru') ? SITE_URL + page.path : SITE_URL + '/ru' + page.path;

		return `	<url>
		<loc>${SITE_URL}${page.path}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
		<xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
		<xhtml:link rel="alternate" hreflang="ru" href="${ruUrl}" />
	</url>`;
	})
	.join('\n')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
