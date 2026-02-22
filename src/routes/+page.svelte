<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Integrations from '$lib/components/sections/Integrations.svelte';
	import Features from '$lib/components/sections/Features.svelte';
	import Downloads from '$lib/components/sections/Downloads.svelte';
</script>

<svelte:head>
	<title>Bearby — Quantum Proof Wallet</title>
	<meta
		name="description"
		content="Bearby is a non-custodial browser wallet with quantum-proof encryption, on-device key storage, and zero data collection."
	/>
</svelte:head>

<Hero />
<About />
<Integrations />
<Features />
<Downloads />
