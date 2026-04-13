<script lang="ts">
	import { SITE_URL } from '$lib/constants';

	const OG_IMAGE = `${SITE_URL}/img/hero-bg.webp`;
	const url = `${SITE_URL}/security`;
	const lastUpdated = '2026-04-13';

	const jsonLdArticle = {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		headline: 'Bearby Security Architecture — Post-Quantum Cryptography for Crypto Wallets',
		description:
			"Technical deep-dive into Bearby's post-quantum cryptographic architecture: NTRU Prime, AES-256, Kuznechik (GOST R 34.12-2015), and Argon2 key derivation. Includes comparison with NIST-standardized CRYSTALS-Kyber and threat timeline for quantum computing.",
		url,
		mainEntityOfPage: url,
		articleSection: 'Cryptography',
		wordCount: 950,
		datePublished: '2023-01-01',
		dateModified: lastUpdated,
		author: {
			'@type': 'Person',
			name: 'Bearby Security Team',
			worksFor: { '@type': 'Organization', name: 'Bearby', url: SITE_URL },
			sameAs: 'https://github.com/bearbywallet'
		},
		publisher: {
			'@type': 'Organization',
			name: 'Bearby',
			url: SITE_URL,
			logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` }
		},
		image: OG_IMAGE,
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: ['h1', '.security-page__subtitle']
		}
	};

	const jsonLdFaq = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is NTRU Prime and why does Bearby use it instead of CRYSTALS-Kyber?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "NTRU Prime is a post-quantum key encapsulation mechanism based on the NTRU lattice problem, developed by Daniel J. Bernstein and colleagues. Unlike CRYSTALS-Kyber (NIST FIPS 203), which uses module lattices with more algebraic structure, NTRU Prime uses a simpler lattice structure that has been studied since 1996. Bearby chose NTRU Prime for its more conservative security assumption: a cryptanalytic breakthrough against module lattices would not automatically apply to NTRU Prime's simpler structure. Both provide quantum resistance, but NTRU Prime offers an additional margin of safety."
				}
			},
			{
				'@type': 'Question',
				name: 'When will quantum computers threaten existing cryptocurrency wallets?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: "NIST estimates that cryptographically relevant quantum computers (CRQCs) capable of breaking 256-bit elliptic-curve cryptography (ECDSA) may emerge within the next 10–15 years. All major wallets — MetaMask, Trust Wallet, Phantom — currently rely on ECDSA with secp256k1, which Shor's algorithm on a CRQC would break. Additionally, 'harvest now, decrypt later' attacks are already theoretically possible: adversaries can record blockchain transactions today and decrypt them once quantum hardware is available. Migration to post-quantum cryptography should begin before quantum computers arrive."
				}
			},
			{
				'@type': 'Question',
				name: 'How does Argon2id protect against brute-force attacks on wallet passwords?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Argon2id is a memory-hard key derivation function — winner of the Password Hashing Competition (PHC, 2015) and recommended by OWASP. Deriving a key requires a configurable, large amount of RAM, making large-scale GPU and ASIC brute-force attacks prohibitively expensive. A typical GPU can run SHA-256 billions of times per second, but Argon2id (configured with sufficient memory) may only allow thousands of attempts per second, dramatically slowing any brute-force attack. Argon2id combines Argon2i resistance to side-channel attacks with Argon2d resistance to GPU brute-force.'
				}
			},
			{
				'@type': 'Question',
				name: 'What is defense-in-depth encryption and how does Bearby implement it?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Defense-in-depth encryption means applying multiple independent cryptographic layers, so that a breakthrough against one layer does not automatically compromise the whole system. Bearby encrypts private keys using both AES-256 (NIST FIPS 197) and Kuznechik (GOST R 34.12-2015) — two symmetric ciphers from entirely different design teams and mathematical lineages. An attacker would need to break both ciphers simultaneously to access key material. This is the most conservative symmetric encryption configuration available in any consumer-grade cryptocurrency wallet.'
				}
			},
			{
				'@type': 'Question',
				name: "Is Bearby's cryptographic code open source and independently auditable?",
				acceptedAnswer: {
					'@type': 'Answer',
					text: "Yes. Bearby's cryptographic core is written in Rust — a memory-safe systems language — and published as open-source software at github.com/bearbywallet. Any security researcher, cryptographer, or developer can review the key generation, encryption, signing, and key derivation logic without relying on Bearby's self-reported claims. Rust's compile-time guarantees eliminate entire classes of vulnerabilities (buffer overflows, use-after-free, data races) that have historically affected cryptographic implementations in C and C++."
				}
			}
		]
	};

	const jsonLdBreadcrumb = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Security Architecture', item: url }
		]
	};
</script>

<svelte:head>
	<title>Security Architecture — Bearby Wallet</title>
	<meta
		name="description"
		content="Technical overview of Bearby's post-quantum cryptographic architecture: NTRU Prime, AES-256, Kuznechik, and Argon2. Learn how Bearby protects your crypto assets against quantum computing threats."
	/>
	<link rel="canonical" href={url} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content="Security Architecture — Bearby Wallet" />
	<meta
		property="og:description"
		content="Technical overview of Bearby's post-quantum cryptographic architecture: NTRU Prime, AES-256, Kuznechik, and Argon2."
	/>
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Bearby Security Architecture" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@BearbyPro" />
	<meta name="twitter:creator" content="@BearbyPro" />
	<meta name="twitter:title" content="Security Architecture — Bearby Wallet" />
	<meta
		name="twitter:description"
		content="Post-quantum cryptography deep-dive: how Bearby uses NTRU Prime, AES-256, Kuznechik, and Argon2 to protect crypto assets."
	/>
	<meta name="twitter:image" content={OG_IMAGE} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdArticle)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdFaq)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLdBreadcrumb)}</script>`}
</svelte:head>

<article class="security-page">
	<div class="security-page__inner">
		<header class="security-page__header">
			<div class="security-page__icon">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					<path d="M9 12l2 2 4-4" />
				</svg>
			</div>
			<h1>Security Architecture</h1>
			<p class="security-page__subtitle">
				How Bearby protects your assets with post-quantum cryptography
			</p>
			<p class="security-page__updated">Last updated: {lastUpdated}</p>
		</header>

		<div class="security-page__content">
			<section class="security-page__section">
				<h2>The Quantum Threat to Cryptocurrency Wallets</h2>
				<p>
					All major cryptocurrency wallets today — MetaMask, Trust Wallet, Phantom, Coinbase Wallet
					— rely on Elliptic Curve Digital Signature Algorithm (ECDSA) with the secp256k1 curve.
					This cryptography is secure against classical computers. However, a sufficiently powerful
					quantum computer running <strong>Shor's algorithm</strong> could derive a private key from a
					public key in polynomial time, breaking ECDSA entirely.
				</p>
				<p>
					NIST estimates that cryptographically relevant quantum computers (CRQCs) capable of
					breaking 256-bit ECC may emerge within the next 10–15 years. For long-term asset security,
					wallets must begin migrating to quantum-resistant algorithms now — before the threat
					materializes.
				</p>
			</section>

			<section class="security-page__section">
				<h2>NTRU Prime — Post-Quantum Key Encapsulation</h2>
				<p>
					Bearby uses <strong>NTRU Prime</strong> (specifically the Streamlined NTRU Prime variant, sntrup761)
					as its primary post-quantum key encapsulation mechanism. NTRU Prime was developed by Daniel
					J. Bernstein, Chitchanok Chuengsatiansup, Tanja Lange, and Christine van Vredendaal.
				</p>
				<p>
					NTRU Prime is based on the hardness of lattice problems (NTRU lattice problem), which are
					believed to be resistant to both classical and quantum attacks. Unlike CRYSTALS-Kyber
					(NIST FIPS 203), NTRU Prime avoids the algebraic structure of module lattices, offering a
					more conservative security foundation against potential future cryptanalytic advances.
				</p>
				<div class="comparison-table">
					<table>
						<thead>
							<tr>
								<th>Property</th>
								<th>NTRU Prime (Bearby)</th>
								<th>CRYSTALS-Kyber (NIST FIPS 203)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Lattice type</td>
								<td>NTRU (simpler structure)</td>
								<td>Module-LWE</td>
							</tr>
							<tr>
								<td>NIST standardized</td>
								<td>Finalist (Round 4)</td>
								<td>Yes (FIPS 203, 2024)</td>
							</tr>
							<tr>
								<td>Security conservatism</td>
								<td>Higher (avoids module structure)</td>
								<td>Standard</td>
							</tr>
							<tr>
								<td>Quantum resistance</td>
								<td>Yes</td>
								<td>Yes</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section class="security-page__section">
				<h2>Symmetric Encryption — AES-256 and Kuznechik</h2>
				<p>
					Private key material at rest is protected by two symmetric ciphers operating in layers:
				</p>
				<ul>
					<li>
						<strong>AES-256</strong> (NIST FIPS 197) — 256-bit Advanced Encryption Standard, the global
						standard for symmetric encryption used by governments and financial institutions worldwide.
						AES-256 provides 128 bits of post-quantum security (Grover's algorithm halves the effective
						key length, but 128-bit security remains computationally infeasible).
					</li>
					<li>
						<strong>Kuznechik</strong> (GOST R 34.12-2015) — the Russian Federal Standard 128-bit block
						cipher standardized by the Federal Agency on Technical Regulating and Metrology. As a second
						independent cipher from a different design lineage, Kuznechik provides defense-in-depth: a
						cryptanalytic breakthrough against AES would not automatically compromise Kuznechik, and vice
						versa.
					</li>
				</ul>
			</section>

			<section class="security-page__section">
				<h2>Key Derivation — Argon2</h2>
				<p>
					User passwords and seed phrases are processed through <strong>Argon2</strong> — the winner of
					the Password Hashing Competition (PHC, 2015) and the recommended password hashing function per
					OWASP guidelines. Argon2 is memory-hard: deriving a key requires a configurable amount of RAM,
					making brute-force attacks on GPUs and ASICs prohibitively expensive.
				</p>
				<p>Bearby uses Argon2id, the hybrid variant that combines:</p>
				<ul>
					<li>Argon2i's resistance to side-channel attacks</li>
					<li>Argon2d's resistance to GPU-based brute-force attacks</li>
				</ul>
			</section>

			<section class="security-page__section">
				<h2>On-Device Key Storage</h2>
				<p>
					All private keys and seed phrases are generated and stored exclusively on your device. No
					key material is ever transmitted to Bearby servers (there are none), third-party services,
					or the blockchain. Transaction signing happens locally before the signed transaction is
					broadcast to the network.
				</p>
				<p>This architecture means:</p>
				<ul>
					<li>A breach of any server cannot expose your keys — they never leave your device</li>
					<li>Bearby cannot freeze, seize, or access your funds</li>
					<li>Zero data collection: no account, no email, no analytics</li>
				</ul>
			</section>

			<section class="security-page__section">
				<h2>Open Source</h2>
				<p>
					Bearby's cryptographic core is written in <strong>Rust</strong> — a memory-safe systems
					language that eliminates entire classes of vulnerabilities (buffer overflows,
					use-after-free, data races) at compile time. The full source code is available for
					inspection at
					<a href="https://github.com/bearbywallet" target="_blank" rel="noopener noreferrer"
						>github.com/bearbywallet</a
					>.
				</p>
				<p>
					Independent security researchers are encouraged to review the cryptographic implementation
					and report any findings via GitHub Issues.
				</p>
			</section>

			<section class="security-page__section">
				<h2>References</h2>
				<ul class="references">
					<li>
						NIST FIPS 197 — Advanced Encryption Standard (AES), 2001 &amp; 2023 revision. <a
							href="https://csrc.nist.gov/publications/detail/fips/197/final"
							target="_blank"
							rel="noopener noreferrer">csrc.nist.gov</a
						>
					</li>
					<li>
						NIST FIPS 203 — Module-Lattice-Based Key-Encapsulation Mechanism Standard
						(CRYSTALS-Kyber), 2024. <a
							href="https://csrc.nist.gov/publications/detail/fips/203/final"
							target="_blank"
							rel="noopener noreferrer">csrc.nist.gov</a
						>
					</li>
					<li>
						Bernstein et al. — "NTRU Prime: Reducing Attack Surface at Low Cost", 2016/2019. <a
							href="https://ntruprime.cr.yp.to/"
							target="_blank"
							rel="noopener noreferrer">ntruprime.cr.yp.to</a
						>
					</li>
					<li>
						GOST R 34.12-2015 — Kuznyechik block cipher, Federal standard of the Russian Federation.
					</li>
					<li>
						Password Hashing Competition — Argon2 specification, 2015. <a
							href="https://github.com/P-H-C/phc-winner-argon2"
							target="_blank"
							rel="noopener noreferrer">github.com/P-H-C/phc-winner-argon2</a
						>
					</li>
					<li>
						OWASP Password Storage Cheat Sheet — Argon2id recommendation. <a
							href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
							target="_blank"
							rel="noopener noreferrer">owasp.org</a
						>
					</li>
				</ul>
			</section>
		</div>
	</div>
</article>

<style>
	.security-page {
		padding: 120px 24px 80px;
		min-height: calc(100vh - 200px);
		position: relative;
	}

	.security-page::before {
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

	.security-page__inner {
		max-width: 840px;
		margin: 0 auto;
	}

	.security-page__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
		margin-bottom: 56px;
	}

	.security-page__icon {
		width: 56px;
		height: 56px;
		padding: 14px;
		background: rgba(172, 89, 255, 0.1);
		border: 1px solid rgba(172, 89, 255, 0.2);
		border-radius: 16px;
		color: #ac59ff;
	}

	.security-page__icon svg {
		width: 28px;
		height: 28px;
	}

	h1 {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-size: 42px;
		font-weight: 600;
		color: var(--text-primary);
	}

	.security-page__subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 18px;
		color: var(--text-secondary);
		max-width: 560px;
	}

	.security-page__updated {
		font-size: 13px;
		color: var(--text-secondary);
		opacity: 0.6;
	}

	.security-page__content {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.security-page__section {
		border-bottom: 1px solid var(--border-card);
		padding-bottom: 40px;
	}

	.security-page__section:last-child {
		border-bottom: none;
	}

	h2 {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-size: 22px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 16px;
	}

	p {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		line-height: 1.75;
		color: var(--text-secondary);
		margin-bottom: 12px;
	}

	p:last-child {
		margin-bottom: 0;
	}

	ul {
		margin-top: 12px;
		padding-left: 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	li {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		line-height: 1.65;
		color: var(--text-secondary);
	}

	a {
		color: #ac59ff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	.comparison-table {
		margin-top: 20px;
		overflow-x: auto;
		border-radius: 12px;
		border: 1px solid var(--border-card);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
	}

	thead tr {
		background: rgba(172, 89, 255, 0.08);
	}

	th,
	td {
		padding: 12px 16px;
		text-align: left;
		border-bottom: 1px solid var(--border-card);
		color: var(--text-secondary);
	}

	th {
		font-weight: 600;
		color: var(--text-primary);
	}

	tr:last-child td {
		border-bottom: none;
	}

	.references li {
		font-size: 14px;
	}

	@media (max-width: 809px) {
		.security-page {
			padding: 80px 16px 60px;
		}

		h1 {
			font-size: 28px;
		}

		.security-page__subtitle {
			font-size: 16px;
		}
	}
</style>
