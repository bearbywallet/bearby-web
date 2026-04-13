<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/state';
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

	const canonicalUrl = $derived(
		page.url.pathname.startsWith('/ru') ? `${SITE_URL}/ru` : SITE_URL
	);
	const OG_IMAGE = `${SITE_URL}/img/hero-bg.webp`;

	const jsonLdApp = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Bearby',
		applicationCategory: 'FinanceApplication',
		applicationSubCategory: 'Cryptocurrency Wallet',
		operatingSystem: 'Android, iOS, Windows, macOS, Linux, Chrome, Firefox',
		description:
			'Quantum-resistant, non-custodial crypto wallet with on-device key storage and zero data collection. Uses NTRU Prime, AES-256, Kuznechik, and Argon2. Supports Bitcoin, Ethereum, and EVM-compatible chains.',
		url: SITE_URL,
		image: OG_IMAGE,
		featureList:
			'Post-quantum encryption (NTRU Prime, AES-256, Kuznechik), on-device key storage, zero data collection, local transaction signing, native Bitcoin support, Rust core engine',
		downloadUrl: [
			'https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkmnpjhhb',
			'https://play.google.com/store/apps/details?id=com.zilpay.bearby',
			'https://apps.apple.com/us/app/bearby-wallet/id1612716382'
		],
		softwareHelp: {
			'@type': 'CreativeWork',
			url: 'https://github.com/bearbywallet'
		},
		author: {
			'@type': 'Organization',
			name: 'Bearby',
			url: SITE_URL
		},
		datePublished: '2023-01-01',
		dateModified: new Date().toISOString().split('T')[0],
		softwareVersion: '3.8.29',
		screenshot: {
			'@type': 'ImageObject',
			url: `${SITE_URL}/img/hero-bg.webp`,
			caption: 'Bearby quantum-resistant wallet interface'
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '1200',
			bestRating: '5',
			worstRating: '1'
		}
	};

	const jsonLdWebSite = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Bearby',
		url: SITE_URL,
		description:
			'Official website of Bearby, the quantum-resistant non-custodial cryptocurrency wallet.',
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE_URL}/?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};

	const jsonLdOrg = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Bearby',
		url: SITE_URL,
		logo: {
			'@type': 'ImageObject',
			url: `${SITE_URL}/favicon.svg`,
			width: 512,
			height: 512
		},
		description:
			'Bearby is a quantum-resistant, non-custodial cryptocurrency wallet using post-quantum cryptography (NTRU Prime, AES-256, Kuznechik, Argon2) to protect digital assets against future quantum computing threats. Available as a browser extension and mobile app for Bitcoin, Ethereum, and EVM-compatible chains.',
		foundingDate: '2022',
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer support',
			email: 'support@bearby.io'
		},
		email: 'support@bearby.io',
		sameAs: [
			'https://github.com/bearbywallet',
			'https://x.com/BearbyPro',
			'https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkmnpjhhb',
			'https://play.google.com/store/apps/details?id=com.zilpay.bearby',
			'https://apps.apple.com/us/app/bearby-wallet/id1612716382'
			// Add LinkedIn and Wikipedia URLs once those pages are created:
			// 'https://www.linkedin.com/company/bearby',
			// 'https://en.wikipedia.org/wiki/Bearby'
		]
	};

	const jsonLdFaq = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is post-quantum cryptography and why does it matter for crypto wallets?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Post-quantum cryptography refers to cryptographic algorithms designed to resist attacks from quantum computers. Current wallets rely on elliptic-curve cryptography (ECC), which a sufficiently powerful quantum computer could break using Shor's algorithm. Bearby uses NTRU Prime — a lattice-based algorithm selected for its resistance to quantum attacks — along with AES-256 and Kuznechik to protect private keys against both classical and quantum threats."
				}
			},
			{
				'@type': 'Question',
				name: 'What does non-custodial mean for a cryptocurrency wallet?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'A non-custodial wallet means you — and only you — control your private keys. No company, server, or third party ever has access to your keys or funds. Bearby generates and stores all keys locally on your device using on-device encryption. There is no account registration and zero data collection.'
				}
			},
			{
				'@type': 'Question',
				name: 'Which blockchain networks does Bearby support?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Bearby supports Bitcoin, Ethereum, and all EVM-compatible chains including Polygon, Arbitrum, Optimism, Base, Avalanche, Linea, and Zilliqa. Additional EVM chains can be added manually via custom RPC configuration.'
				}
			},
			{
				'@type': 'Question',
				name: 'How does Bearby protect user privacy?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Bearby collects zero user data. There are no analytics, no telemetry, no account system, and no server-side storage of any kind. All transaction signing happens locally on your device. The open-source codebase can be independently verified at github.com/bearbywallet.'
				}
			},
			{
				'@type': 'Question',
				name: 'Is Bearby open source?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Yes. Bearby's core engine is written in Rust and published as open-source software on GitHub at github.com/bearbywallet. The open-source model allows independent security researchers to audit the cryptographic implementation and key management logic."
				}
			}
		]
	};
</script>

<svelte:head>
	<title>{m.seo_title()}</title>
	<meta name="description" content={m.seo_description()} />
	<meta name="keywords" content={m.seo_keywords()} />
	<link rel="canonical" href={canonicalUrl} />

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
	<meta name="twitter:site" content="@BearbyPro" />
	<meta name="twitter:creator" content="@BearbyPro" />
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
		position: relative;
	}

	.page-wrapper::before {
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
</style>
