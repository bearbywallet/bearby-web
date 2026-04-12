export const prerender = true;

export async function GET() {
	const content = `# Bearby

> Quantum-resistant, non-custodial cryptocurrency wallet using NTRU Prime, AES-256,
> Kuznechik, and Argon2. Open-source Rust core. Supports Bitcoin, Ethereum, and EVM
> chains. Zero data collection.

## Product

- [Bearby Wallet](https://bearby.io): Homepage — quantum-resistant crypto wallet overview
- [Chrome Extension](https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkmnpjhhb): Browser extension for Chrome and Chromium-based browsers
- [Android App](https://play.google.com/store/apps/details?id=com.zilpay.bearby): Google Play (100,000+ downloads)
- [iOS App](https://apps.apple.com/us/app/bearby-wallet/id1612716382): Apple App Store
- [Privacy Policy](https://bearby.io/privacy-policy): Data handling and privacy information

## Security

- [GitHub (bearbywallet)](https://github.com/bearbywallet): Open-source repositories — Rust core engine, browser extension, mobile apps

## Optional

- [Twitter/X](https://x.com/BearbyPro): Official announcements and updates`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
