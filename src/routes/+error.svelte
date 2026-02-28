<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>{page.status === 404 ? m.error_title() : m.error_generic_title()}</title>
</svelte:head>

<div class="error-page">
	<span class="error-code">{page.status}</span>
	<h1>{page.status === 404 ? m.error_title() : m.error_generic_title()}</h1>
	<p>{page.status === 404 ? m.error_description() : m.error_generic_description()}</p>
	<a href="/" class="error-link">{m.error_back_home()}</a>
</div>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		padding: 24px;
		text-align: center;
		gap: 16px;
	}

	.error-code {
		font-size: clamp(5rem, 15vw, 10rem);
		font-weight: 600;
		font-family: var(--font-primary);
		line-height: 1;
		background: linear-gradient(270deg, var(--brand-purple), var(--brand-pink));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	h1 {
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		color: var(--text-primary);
	}

	p {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 480px;
	}

	.error-link {
		margin-top: 8px;
		padding: 12px 32px;
		border-radius: 40px;
		background: var(--brand-purple);
		color: #fff;
		font-weight: 500;
		font-size: 0.9375rem;
		transition: opacity 0.2s;
	}

	.error-link:hover {
		opacity: 0.85;
	}
</style>
