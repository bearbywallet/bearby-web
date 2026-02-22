<svelte:head>
	<title>Privacy Policy — Bearby</title>
	<meta name="description" content="Bearby Privacy Policy — we collect no user data." />
</svelte:head>

<article class="privacy">
	<div class="privacy__inner">
		<h1 class="privacy__title">Privacy Policy</h1>
		<p class="privacy__updated">Last updated: February 2026</p>

		<section class="privacy__section">
			<h2>Zero Data Collection</h2>
			<p>
				Bearby does not collect, store, or transmit any personal data. Your wallet keys, transaction
				history, and activity remain entirely on your device.
			</p>
		</section>

		<section class="privacy__section">
			<h2>On-Device Storage</h2>
			<p>
				All cryptographic keys and wallet data are stored locally using your device's secure storage.
				We have no servers, no databases, and no way to access your funds or identity.
			</p>
		</section>

		<section class="privacy__section">
			<h2>Open Source</h2>
			<p>
				Bearby is fully open source. You can audit every line of code on
				<a href="https://github.com/zilpay" target="_blank" rel="noopener noreferrer">GitHub</a>.
			</p>
		</section>

		<section class="privacy__section">
			<h2>Contact</h2>
			<p>
				Questions? Open an issue or discussion on our
				<a href="https://github.com/zilpay" target="_blank" rel="noopener noreferrer"
					>GitHub repository</a
				>.
			</p>
		</section>
	</div>
</article>

<style>
	.privacy {
		padding: var(--space-2xl) var(--space-md);
		min-height: calc(100vh - var(--nav-height) - 200px);
	}

	.privacy__inner {
		max-width: 720px;
		margin: 0 auto;
	}

	.privacy__title {
		font-size: clamp(2rem, 4vw, 3rem);
		letter-spacing: -0.02em;
		color: var(--color-text);
		margin-bottom: var(--space-xs);
	}

	.privacy__updated {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-bottom: var(--space-xl);
	}

	.privacy__section {
		margin-bottom: var(--space-lg);
	}

	.privacy__section h2 {
		font-size: 1.25rem;
		color: var(--color-text);
		margin-bottom: var(--space-xs);
	}

	.privacy__section p {
		font-size: 1rem;
		color: var(--color-text-muted);
		line-height: 1.7;
	}

	.privacy__section a {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
