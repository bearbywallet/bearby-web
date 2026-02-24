<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/layout/Nav.svelte';
	import { initTheme } from '$lib/stores/theme.svelte';
	import '../app.css';

	let { children, data } = $props();

	initTheme(data.theme);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>
