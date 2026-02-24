<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/layout/Nav.svelte';
	import { initTheme, type Theme } from '$lib/stores/theme.svelte';
	import '../app.css';

	let { children, data } = $props();

	$effect(() => {
		initTheme(data.theme as Theme);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>
