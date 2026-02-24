<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import WalletSection from '$lib/components/sections/WalletSection.svelte';
	import Features from '$lib/components/sections/Features.svelte';
	import Showcases from '$lib/components/sections/Showcases.svelte';
	import Security from '$lib/components/sections/Security.svelte';
	import ExtraFeatures from '$lib/components/sections/About.svelte';
	import Integrations from '$lib/components/sections/Integrations.svelte';
	import Downloads from '$lib/components/sections/Downloads.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>Bearby — Quantum Proof Wallet</title>
	<meta
		name="description"
		content="Bearby is a non-custodial browser wallet with quantum-proof encryption, on-device key storage, and zero data collection."
	/>
</svelte:head>

<main class="page-wrapper">
	<Hero />
	<div use:reveal><WalletSection /></div>
	<div use:reveal={{ delay: 50 }}><Features /></div>
	<div use:reveal><Showcases /></div>
	<div use:reveal><Security /></div>
	<div use:reveal><ExtraFeatures /></div>
	<div use:reveal><Integrations /></div>
	<div use:reveal><Downloads /></div>
	<div use:reveal={{ y: 24 }}><Footer /></div>
</main>

<style>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
