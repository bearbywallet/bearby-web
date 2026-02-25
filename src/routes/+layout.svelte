<script lang="ts">
	import Nav from '$lib/components/layout/Nav.svelte';
	import { initTheme, type Theme } from '$lib/stores/theme.svelte';
	import '../app.css';

	let { children, data } = $props();

	$effect(() => {
		initTheme(data.theme as Theme);
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>
