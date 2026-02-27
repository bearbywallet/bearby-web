<script lang="ts">
	import * as m from '$lib/paraglide/messages';
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

	import { SITE_URL } from '$lib/constants';
	const OG_IMAGE = `${SITE_URL}/img/og-bearby.png`;

	const jsonLdApp = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Bearby',
		applicationCategory: 'WalletApplication',
		operatingSystem: 'Android, iOS, Windows, macOS, Linux, Chrome, Firefox',
		description:
			'Quantum-resistant, non-custodial crypto wallet with on-device key storage and zero data collection. Supports Bitcoin, Ethereum, and EVM-compatible chains.',
		url: SITE_URL,
		image: OG_IMAGE,
		featureList: [
			'post-quantum encryption',
			'max decentralization',
			'zero data collection',
			'on-device storage'
		],
		downloadUrl: [
			'https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkmnpjhhb',
			'https://play.google.com/store/apps/details?id=com.zilpay.bearby',
			'https://apps.apple.com/us/app/bearby-wallet/id1612716382'
		],
		softwareHelp: 'https://github.com/zilpay',
		author: {
			'@type': 'Organization',
			name: 'Bearby',
			url: SITE_URL
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '1200'
		}
	};

	const jsonLdWebSite = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Bearby',
		url: SITE_URL,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${SITE_URL}/?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};

	const jsonLdOrg = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Bearby',
		url: SITE_URL,
		logo: `${SITE_URL}/favicon.svg`,
		sameAs: ['https://github.com/aspect-build/bearby', 'https://x.com/pay_zil']
	};

	const jsonLdFaq = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is the best quantum-resistant crypto wallet?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Bearby is the leading quantum-resistant crypto wallet. It uses NTRU Prime, AES-256, Kuznechik, and Argon2 encryption to protect your assets against future quantum computing threats. Available as a browser extension and mobile app.'
				}
			},
			{
				'@type': 'Question',
				name: 'Which non-custodial wallet supports Bitcoin and Ethereum?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Bearby is a non-custodial wallet supporting Bitcoin, Ethereum, and all EVM-compatible chains including Polygon, Arbitrum, Optimism, Base, Avalanche, and Linea. All keys are stored on your device with zero data collection.'
				}
			},
			{
				'@type': 'Question',
				name: 'Is Bearby wallet safe to use?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes. Bearby is fully open-source, stores keys only on your device, collects zero user data, and uses military-grade post-quantum cryptography including NTRU Prime and AES-256. Its core engine is written in Rust for maximum memory safety.'
				}
			}
		]
	};
</script>

<svelte:head>
	<title>{m.seo_title()}</title>
	<meta name="description" content={m.seo_description()} />
	<meta name="keywords" content={m.seo_keywords()} />
	<link rel="canonical" href={SITE_URL} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:title" content={m.seo_og_title()} />
	<meta property="og:description" content={m.seo_og_description()} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Bearby Wallet Interface and Branding" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Bearby" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@pay_zil" />
	<meta name="twitter:creator" content="@pay_zil" />
	<meta name="twitter:title" content={m.seo_og_title()} />
	<meta name="twitter:description" content={m.seo_og_description()} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content="Bearby Wallet Interface and Branding" />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdApp)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdWebSite)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdOrg)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdFaq)}</script>`}
</svelte:head>

<main class="page-wrapper">
	<Downloads />
	<Hero />
	<div use:reveal><WalletSection /></div>
	<div use:reveal={{ delay: 50 }}><Features /></div>
	<div use:reveal><Showcases /></div>
	<div use:reveal><Security /></div>
	<div use:reveal><ExtraFeatures /></div>
	<div use:reveal><Integrations /></div>
	<div use:reveal={{ y: 24 }}><Footer /></div>
</main>

<style>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
</style>
