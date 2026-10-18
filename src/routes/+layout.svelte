<script lang="ts">
	import { page } from '$app/state';
	import Nav from '$lib/components/layout/Nav.svelte';
	import LocaleSwitcher from '$lib/components/layout/LocaleSwitcher.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
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

	// The farm page is unlisted and renders its own chrome (no Nav/Footer/switcher).
	let localeFreePath = $derived(page.url.pathname.replace(/^\/(?:ru|es|pt-BR)(?=\/|$)/, ''));
	let isFarm = $derived(localeFreePath === '/farm' || localeFreePath.startsWith('/farm/'));

	let enUrl = $derived(basePath === '/' ? SITE_URL + '/' : SITE_URL + basePath);
	let ruUrl = $derived(basePath === '/' ? SITE_URL + '/ru/' : SITE_URL + '/ru' + basePath);
	let ptBrUrl = $derived(basePath === '/' ? SITE_URL + '/pt-BR/' : SITE_URL + '/pt-BR' + basePath);
	let esUrl = $derived(basePath === '/' ? SITE_URL + '/es/' : SITE_URL + '/es' + basePath);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

	{#if !isFarm}
		<link rel="alternate" hreflang="x-default" href={enUrl} />
		<link rel="alternate" hreflang="en" href={enUrl} />
		<link rel="alternate" hreflang="ru" href={ruUrl} />
		<link rel="alternate" hreflang="pt-BR" href={ptBrUrl} />
		<link rel="alternate" hreflang="es" href={esUrl} />
	{/if}
</svelte:head>

{#if !isFarm}
	<Nav />
	<LocaleSwitcher />
{/if}

<main id="main-content">
	{@render children()}
</main>

{#if !isFarm}
	<Footer />
{/if}
