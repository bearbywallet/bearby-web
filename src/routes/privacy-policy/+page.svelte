<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { SITE_URL } from '$lib/constants';

	const OG_IMAGE = `${SITE_URL}/img/hero-bg.webp`;
	const url = `${SITE_URL}/privacy-policy`;
</script>

<svelte:head>
	<title>{m.privacy_page_title()}</title>
	<meta name="description" content={m.privacy_meta_desc()} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={m.privacy_page_title()} />
	<meta property="og:description" content={m.privacy_meta_desc()} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Bearby Wallet Privacy Policy" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.privacy_page_title()} />
	<meta name="twitter:description" content={m.privacy_meta_desc()} />
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<article class="privacy">
	<div class="privacy__inner">
		<h1 class="privacy__title">{m.privacy_title()}</h1>
		<p class="privacy__updated">{m.privacy_updated()}</p>

		<section class="privacy__section">
			<h2>{m.privacy_zero_data_title()}</h2>
			<p>
				{m.privacy_zero_data_desc()}
			</p>
		</section>

		<section class="privacy__section">
			<h2>{m.privacy_storage_title()}</h2>
			<p>
				{m.privacy_storage_desc()}
			</p>
		</section>

		<section class="privacy__section">
			<h2>{m.privacy_opensource_title()}</h2>
			<p>
				{@html m.privacy_opensource_desc({
					link:
						'<a href="https://github.com/zilpay" target="_blank" rel="noopener noreferrer">' +
						m.privacy_github() +
						'</a>'
				})}
			</p>
		</section>

		<section class="privacy__section">
			<h2>{m.privacy_contact_title()}</h2>
			<p>
				{@html m.privacy_contact_desc({
					link:
						'<a href="https://github.com/zilpay" target="_blank" rel="noopener noreferrer">' +
						m.privacy_github_repo() +
						'</a>'
				})}
			</p>
		</section>
	</div>
</article>

<style>
	.privacy {
		padding: 120px 24px 80px;
		min-height: calc(100vh - 200px);
	}

	.privacy__inner {
		max-width: 720px;
		margin: 0 auto;
	}

	.privacy__title {
		font-size: clamp(2rem, 4vw, 3rem);
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin-bottom: 8px;
	}

	.privacy__updated {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-bottom: 48px;
	}

	.privacy__section {
		margin-bottom: 32px;
	}

	.privacy__section h2 {
		font-size: 1.25rem;
		color: var(--text-primary);
		margin-bottom: 8px;
	}

	.privacy__section p {
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.privacy__section :global(a) {
		color: var(--brand-purple);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
