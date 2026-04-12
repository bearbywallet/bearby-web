<script lang="ts">
	import { SITE_URL } from '$lib/constants';

	const OG_IMAGE = `${SITE_URL}/img/hero-bg.webp`;
	const url = `${SITE_URL}/terms`;
	const lastUpdated = '2026-04-13';
</script>

<svelte:head>
	<title>Terms of Service — Bearby Wallet</title>
	<meta
		name="description"
		content="Bearby Wallet Terms of Service. Read our terms governing the use of the Bearby non-custodial cryptocurrency wallet."
	/>
	<link rel="canonical" href={url} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content="Terms of Service — Bearby Wallet" />
	<meta
		property="og:description"
		content="Bearby Wallet Terms of Service. Read our terms governing the use of the Bearby non-custodial cryptocurrency wallet."
	/>
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:alt" content="Bearby Wallet Terms of Service" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Terms of Service — Bearby Wallet" />
	<meta
		name="twitter:description"
		content="Bearby Wallet Terms of Service. Read our terms governing the use of the Bearby non-custodial cryptocurrency wallet."
	/>
	<meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<article class="legal">
	<div class="legal__inner">
		<header class="legal__header">
			<div class="legal__icon">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path
						d="M9 12h6M9 16h6M9 8h6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
					/>
				</svg>
			</div>
			<h1 class="legal__title">Terms of Service</h1>
			<p class="legal__updated">Last updated: {lastUpdated}</p>
		</header>

		<div class="legal__content">
			<section class="legal__section">
				<p>
					By downloading, installing, or using the Bearby wallet software, browser extension, or
					mobile application (collectively, the "Software"), you agree to be bound by these Terms of
					Service. If you do not agree, do not use the Software.
				</p>
			</section>

			<section class="legal__section">
				<h2>1. Non-Custodial Software</h2>
				<p>
					Bearby is non-custodial software. We do not hold, store, transmit, or have access to your
					private keys, seed phrases, or digital assets at any time. You are solely responsible for
					safeguarding your private keys and seed phrase. Lost keys cannot be recovered by Bearby or
					anyone else.
				</p>
			</section>

			<section class="legal__section">
				<h2>2. No Warranty</h2>
				<p>
					The Software is provided "as is" and "as available" without warranty of any kind, express
					or implied. Bearby makes no warranties regarding merchantability, fitness for a particular
					purpose, or non-infringement. Cryptographic software carries inherent risks. Use at your
					own risk.
				</p>
			</section>

			<section class="legal__section">
				<h2>3. Limitation of Liability</h2>
				<p>
					To the maximum extent permitted by applicable law, Bearby and its contributors shall not be
					liable for any indirect, incidental, special, consequential, or punitive damages, including
					loss of digital assets, arising out of or related to your use of the Software.
				</p>
			</section>

			<section class="legal__section">
				<h2>4. Open Source License</h2>
				<p>
					Bearby's core software is open source. Your use of the software source code is subject to
					the applicable open-source license available at
					<a href="https://github.com/bearbywallet" target="_blank" rel="noopener noreferrer"
						>github.com/bearbywallet</a
					>. These Terms of Service govern your use of the compiled software and associated services.
				</p>
			</section>

			<section class="legal__section">
				<h2>5. Prohibited Uses</h2>
				<p>You agree not to use the Software to:</p>
				<ul>
					<li>Violate any applicable law or regulation</li>
					<li>Engage in money laundering, terrorist financing, or other financial crimes</li>
					<li>Circumvent sanctions or export control regulations</li>
					<li>Attempt to reverse-engineer or tamper with the Software's security mechanisms</li>
				</ul>
			</section>

			<section class="legal__section">
				<h2>6. Third-Party Networks</h2>
				<p>
					Bearby connects to third-party blockchain networks, RPC providers, and decentralized
					applications (dApps). We are not responsible for the operation, availability, or security
					of these third-party services.
				</p>
			</section>

			<section class="legal__section">
				<h2>7. Updates to These Terms</h2>
				<p>
					We may update these Terms from time to time. Continued use of the Software after changes
					constitutes acceptance of the updated Terms. Material changes will be announced via our
					official channels at
					<a href="https://x.com/BearbyPro" target="_blank" rel="noopener noreferrer">@BearbyPro</a>.
				</p>
			</section>

			<section class="legal__section">
				<h2>8. Contact</h2>
				<p>
					Questions about these Terms may be directed to our team via GitHub at
					<a href="https://github.com/bearbywallet" target="_blank" rel="noopener noreferrer"
						>github.com/bearbywallet</a
					>.
				</p>
			</section>
		</div>
	</div>
</article>

<style>
	.legal {
		padding: 120px 24px 80px;
		min-height: calc(100vh - 200px);
		position: relative;
	}

	.legal::before {
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

	.legal__inner {
		max-width: 840px;
		margin: 0 auto;
	}

	.legal__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
		margin-bottom: 48px;
	}

	.legal__icon {
		width: 56px;
		height: 56px;
		padding: 14px;
		background: rgba(172, 89, 255, 0.1);
		border: 1px solid rgba(172, 89, 255, 0.2);
		border-radius: 16px;
		color: #ac59ff;
	}

	.legal__icon svg {
		width: 28px;
		height: 28px;
	}

	.legal__title {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-size: 42px;
		font-weight: 600;
		color: var(--text-primary);
	}

	.legal__updated {
		font-size: 14px;
		color: var(--text-secondary);
	}

	.legal__content {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.legal__section {
		border-bottom: 1px solid var(--border-card);
		padding-bottom: 32px;
	}

	.legal__section:last-child {
		border-bottom: none;
	}

	h2 {
		font-family: 'Bricolage Grotesque', sans-serif;
		font-size: 20px;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 12px;
	}

	p {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	ul {
		margin-top: 12px;
		padding-left: 24px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	li {
		font-family: 'Inter', sans-serif;
		font-size: 16px;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	a {
		color: #ac59ff;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	@media (max-width: 809px) {
		.legal {
			padding: 80px 16px 60px;
		}

		.legal__title {
			font-size: 28px;
		}
	}
</style>
