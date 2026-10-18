import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Hosts that serve this app directly (dev + preview). The farm subdomains are
// redirected to `/farm` by `hooks.server.ts`.
const allowedHosts = [
	'dev.bearby.io',
	'bearby.io',
	'bearby.ru',
	'farm.bearby.ru',
	'farm.bearby.io'
];

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	],
	server: {
		allowedHosts
	},
	preview: {
		allowedHosts
	}
});
