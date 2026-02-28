<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { SITE_URL } from '$lib/constants';

	const links = [
		{ href: '/', label: () => m.sitemap_home() },
		{ href: '/privacy-policy', label: () => m.sitemap_privacy() },
		{ href: '/sitemap', label: () => m.sitemap_heading() }
	];
</script>

<svelte:head>
	<title>{m.sitemap_title()}</title>
	<meta name="description" content="Bearby website sitemap" />
	<link rel="canonical" href="{SITE_URL + '/sitemap'}" />
</svelte:head>

<div class="sitemap-page container">
	<h1>{m.sitemap_heading()}</h1>
	<nav aria-label="Sitemap">
		<ul>
			{#each links as link (link.href)}
				<li><a href={link.href}>{link.label()}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	.sitemap-page {
		min-height: 60vh;
		padding-top: 140px;
		padding-bottom: 64px;
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin-bottom: 32px;
		color: var(--text-primary);
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	a {
		font-size: 1.125rem;
		color: var(--text-secondary);
		transition: color 0.2s;
	}

	a:hover {
		color: var(--brand-purple);
	}
</style>
