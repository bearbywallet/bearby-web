import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*', '/robots.txt'],
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;
