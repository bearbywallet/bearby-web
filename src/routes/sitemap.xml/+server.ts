export const prerender = true;

import { SITE_URL } from '$lib/constants';

interface SitemapUrl {
	loc: string;
	changefreq: string;
	priority: string;
	lastmod?: string;
}

export async function GET() {
	const today = new Date().toISOString().split('T')[0];

	const urls: SitemapUrl[] = [
		{ loc: `${SITE_URL}`, changefreq: 'weekly', priority: '1.0', lastmod: today },
		{ loc: `${SITE_URL}/ru/`, changefreq: 'weekly', priority: '0.9', lastmod: today },
		{
			loc: `${SITE_URL}/privacy-policy`,
			changefreq: 'monthly',
			priority: '0.5',
			lastmod: today
		},
		{ loc: `${SITE_URL}/terms`, changefreq: 'monthly', priority: '0.5', lastmod: today },
		{ loc: `${SITE_URL}/security`, changefreq: 'monthly', priority: '0.7', lastmod: today }
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
