<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { SITE_URL } from '$lib/constants';

	const OG_IMAGE = `${SITE_URL}/img/hero-bg.webp`;
	const url = `${SITE_URL}/privacy-policy`;

	interface Section {
		id: string;
		title?: string;
		content: string;
	}

	const sections: Section[] = [
		{ id: 'intro', content: m.privacy_p0() },
		{ id: 'supplement', content: m.privacy_p1() },
		{ id: 'agreement', content: m.privacy_p2() },
		{ id: 'third-party', content: m.privacy_p3() },
		{ id: 'eligibility', title: m.privacy_sub_title4(), content: m.privacy_p5() },
		{ id: 'collect-title', title: m.privacy_sub_title6(), content: '' },
		{ id: 'never-collect', content: m.privacy_p7() },
		{ id: 'non-custodial', content: m.privacy_p8() },
		{ id: 'third-party-data', content: m.privacy_p9() },
		{ id: 'how-why-title', title: m.privacy_sub_title10(), content: m.privacy_p11() },
		{ id: 'providing', content: `<strong>${m.privacy_p12()}</strong><br>${m.privacy_p13()}` },
		{ id: 'improve', content: `<strong>${m.privacy_p14()}</strong><br>${m.privacy_p15()}` },
		{ id: 'communicate', content: `<strong>${m.privacy_p16()}</strong><br>${m.privacy_p17()}` },
		{ id: 'compliance', content: `<strong>${m.privacy_p18()}</strong><br>${m.privacy_p19()}` },
		{ id: 'fraud', content: `<strong>${m.privacy_p20()}</strong><br>${m.privacy_p21()}` },
		{ id: 'sharing-title', title: m.privacy_sub_title22(), content: m.privacy_p23() },
		{ id: 'sharing-parties', content: m.privacy_p24() },
		{ id: 'cross-border-title', title: m.privacy_sub_title25(), content: '' },
		{ id: 'cross-border-1', content: m.privacy_p26() },
		{ id: 'cross-border-2', content: m.privacy_p27() },
		{ id: 'cross-border-3', content: m.privacy_p28() },
		{ id: 'retention-title', title: m.privacy_sub_title29(), content: '' },
		{ id: 'retention-1', content: m.privacy_p30() },
		{ id: 'retention-2', content: m.privacy_p31() },
		{ id: 'security-title', title: m.privacy_sub_title32(), content: '' },
		{ id: 'security-1', content: m.privacy_p33() },
		{ id: 'security-2', content: m.privacy_p34() },
		{ id: 'security-3', content: m.privacy_p35() },
		{ id: 'choices-title', title: m.privacy_sub_title36(), content: m.privacy_p37() },
		{ id: 'rights', content: m.privacy_p38() },
		{ id: 'exercise', content: m.privacy_p39() },
		{ id: 'contact', content: m.privacy_p40() }
	];

	const titledSections = sections.filter((s) => s.title);
</script>

<svelte:head>
	<title>{m.privacy_page_title()}</title>
	<meta name="description" content={m.privacy_title()} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={m.privacy_page_title()} />
	<meta property="og:description" content={m.privacy_title()} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Bearby Wallet Privacy Policy" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@BearbyPro" />
	<meta name="twitter:creator" content="@BearbyPro" />
	<meta name="twitter:title" content={m.privacy_page_title()} />
	<meta name="twitter:description" content={m.privacy_title()} />
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<article class="privacy">
	<div class="privacy__inner">
		<header class="privacy__header">
			<div class="privacy__icon">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					<path d="M9 12l2 2 4-4" />
				</svg>
			</div>
			<h1 class="privacy__title">{m.privacy_title()}</h1>
			<p class="privacy__updated">{m.privacy_updated()}</p>
		</header>

		<nav class="privacy__toc" aria-label="Table of Contents">
			<div class="toc__header">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M4 6h16M4 12h16M4 18h7" />
				</svg>
				<span>Contents</span>
			</div>
			<ul class="toc__list">
				{#each titledSections as section}
					<li>
						<a href="#{section.id}" class="toc__link">{section.title}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="privacy__content">
			{#each sections as section}
				<section id={section.id} class="privacy__section">
					{#if section.title}
						<h2 class="section__title">{section.title}</h2>
					{/if}
					{#if section.content}
						<p class="section__text">{@html section.content}</p>
					{/if}
				</section>
			{/each}
		</div>
	</div>
</article>

<style>
	.privacy {
		padding: 120px 24px 80px;
		min-height: calc(100vh - 200px);
		position: relative;
	}

	.privacy::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			radial-gradient(ellipse 80% 50% at 50% -20%, rgba(172, 89, 255, 0.15), transparent),
			radial-gradient(ellipse 60% 40% at 80% 100%, rgba(232, 0, 111, 0.1), transparent);
		pointer-events: none;
		z-index: -1;
	}

	.privacy__inner {
		max-width: 840px;
		margin: 0 auto;
	}

	.privacy__header {
		text-align: center;
		margin-bottom: 48px;
		padding: 48px;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.02) 100%
		);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--card-radius);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(30px);
		position: relative;
		overflow: hidden;
	}

	.privacy__header::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.15) 50%,
			transparent 100%
		);
	}

	.privacy__icon {
		width: 64px;
		height: 64px;
		margin: 0 auto 24px;
		padding: 16px;
		background: linear-gradient(135deg, rgba(172, 89, 255, 0.2), rgba(232, 0, 111, 0.2));
		border-radius: 20px;
		color: var(--brand-purple);
	}

	.privacy__icon svg {
		width: 100%;
		height: 100%;
	}

	.privacy__title {
		font-family: var(--font-primary);
		font-size: clamp(2rem, 5vw, 3rem);
		font-weight: 500;
		letter-spacing: -0.03em;
		color: var(--text-primary);
		margin-bottom: 12px;
		background: linear-gradient(135deg, var(--text-primary) 0%, var(--brand-purple) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.privacy__updated {
		font-size: 0.875rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.privacy__toc {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.03) 0%,
			rgba(255, 255, 255, 0.01) 100%
		);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: var(--border-radius-lg);
		padding: 24px 32px;
		margin-bottom: 48px;
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}

	.toc__header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
		color: var(--text-primary);
		font-weight: 500;
	}

	.toc__header svg {
		width: 20px;
		height: 20px;
		color: var(--brand-purple);
	}

	.toc__list {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 8px 24px;
	}

	.toc__link {
		display: block;
		padding: 8px 0;
		color: var(--text-secondary);
		font-size: 0.875rem;
		text-decoration: none;
		transition: color 0.2s ease;
		position: relative;
		padding-left: 16px;
	}

	.toc__link::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--brand-purple);
		opacity: 0.5;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.toc__link:hover {
		color: var(--brand-purple);
	}

	.toc__link:hover::before {
		opacity: 1;
		transform: translateY(-50%) scale(1.2);
	}

	.privacy__content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.privacy__section {
		padding: 24px;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.02) 0%,
			rgba(255, 255, 255, 0.01) 100%
		);
		border: 1px solid rgba(255, 255, 255, 0.04);
		border-radius: var(--border-radius-md);
		transition:
			border-color 0.3s ease,
			background 0.3s ease;
	}

	.privacy__section:hover {
		border-color: rgba(255, 255, 255, 0.08);
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.04) 0%,
			rgba(255, 255, 255, 0.02) 100%
		);
	}

	.privacy__section:has(.section__title) {
		scroll-margin-top: 100px;
	}

	.section__title {
		font-family: var(--font-primary);
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: 16px;
		letter-spacing: -0.01em;
	}

	.section__text {
		color: var(--text-secondary);
		line-height: 1.8;
		font-size: 0.9375rem;
	}

	.section__text :global(a) {
		color: var(--brand-purple);
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: color 0.2s ease;
	}

	.section__text :global(a:hover) {
		color: var(--brand-pink);
	}

	.section__text :global(strong) {
		color: var(--text-primary);
		font-weight: 500;
	}

	@media (max-width: 809px) {
		.privacy {
			padding: 100px 16px 60px;
		}

		.privacy__header {
			padding: 32px 24px;
			border-radius: var(--border-radius-lg);
		}

		.privacy__icon {
			width: 48px;
			height: 48px;
			padding: 12px;
			border-radius: 14px;
			margin-bottom: 16px;
		}

		.privacy__toc {
			padding: 20px 24px;
		}

		.toc__list {
			grid-template-columns: 1fr;
		}

		.privacy__section {
			padding: 20px;
		}

		.section__title {
			font-size: 1.125rem;
		}

		.section__text {
			font-size: 0.875rem;
		}
	}
</style>
