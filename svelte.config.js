import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*', '/robots.txt', '/llms.txt', '/sitemap.xml'],
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
