<script lang="ts">
	import { page } from '$app/state';
	import Nav from '$lib/components/layout/Nav.svelte';
	import LocaleSwitcher from '$lib/components/layout/LocaleSwitcher.svelte';
	import { initTheme, type Theme } from '$lib/stores/theme.svelte';
	import '../app.css';

	let { children, data } = $props();

	import { SITE_URL } from '$lib/constants';

	$effect(() => {
		initTheme(data.theme as Theme);
	});

	let basePath = $derived(
		page.url.pathname.startsWith('/ru')
			? page.url.pathname.replace(/^\/ru(\/|$)/, '/')
			: page.url.pathname
	);

	let enUrl = $derived(basePath === '/' ? SITE_URL + '/' : SITE_URL + basePath);
	let ruUrl = $derived(basePath === '/' ? SITE_URL + '/ru/' : SITE_URL + '/ru' + basePath);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

	<link rel="alternate" hreflang="x-default" href={enUrl} />
	<link rel="alternate" hreflang="en" href={enUrl} />
	<link rel="alternate" hreflang="ru" href={ruUrl} />
</svelte:head>

<Nav />
<LocaleSwitcher />

<main>
	{@render children()}
</main>
