export const prerender = true;

export async function GET() {
	const content = `# Bearby

> Quantum-resistant, non-custodial cryptocurrency wallet using NTRU Prime (sntrup761),
> AES-256, Kuznechik (GOST R 34.12-2015), and Argon2id. Open-source Rust core.
> Supports Bitcoin, Ethereum, and all EVM-compatible chains. Zero data collection.
> Available as a browser extension (Chrome/Chromium) and mobile app (Android/iOS).

## Product

- [Bearby Wallet](https://bearby.io): Official homepage — quantum-resistant crypto wallet overview, features, supported chains, and download links for all platforms.
- [Security Architecture](https://bearby.io/security): Technical documentation covering NTRU Prime (sntrup761), AES-256, Kuznechik dual-layer encryption, Argon2id key derivation, and comparison with CRYSTALS-Kyber (NIST FIPS 203).
- [Privacy Policy](https://bearby.io/privacy-policy): Bearby's zero-data-collection privacy policy — no accounts, no analytics, no server-side key storage. Last updated April 2026.
- [Terms of Service](https://bearby.io/terms): Terms governing use of the Bearby non-custodial cryptocurrency wallet and related services.
- [Russian Language Version](https://bearby.io/ru/): Full Russian-language version of the Bearby wallet website.

## Downloads

- [Chrome Extension](https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkmnpjhhb): Bearby browser extension for Chrome and Chromium-based browsers — quantum-resistant wallet directly in the browser.
- [Android App](https://play.google.com/store/apps/details?id=com.zilpay.bearby): Bearby on Google Play — 100,000+ downloads, 4.8/5 rating from 1,200+ reviews.
- [iOS App](https://apps.apple.com/us/app/bearby-wallet/id1612716382): Bearby on the Apple App Store — quantum-resistant mobile wallet for iPhone and iPad.

## Source Code

- [GitHub (bearbywallet)](https://github.com/bearbywallet): Open-source repositories — Rust cryptographic core engine, browser extension source, mobile application source. Available for independent security review.

## FAQ

**What is NTRU Prime and why does Bearby use it?**
NTRU Prime is a post-quantum key encapsulation mechanism based on lattice problems (specifically the NTRU lattice problem), developed by Daniel J. Bernstein and colleagues. Bearby uses the Streamlined NTRU Prime variant (sntrup761) because it avoids the algebraic structure of module lattices used by CRYSTALS-Kyber (NIST FIPS 203), providing a more conservative security foundation. NTRU Prime was a Round 4 finalist in the NIST Post-Quantum Cryptography standardization process.

**When will quantum computers threaten existing crypto wallets?**
NIST estimates that cryptographically relevant quantum computers (CRQCs) capable of breaking 256-bit elliptic-curve cryptography (ECDSA/secp256k1) may emerge within 10–15 years. All major wallets today — MetaMask, Trust Wallet, Phantom — rely on ECDSA, which Shor's algorithm running on a CRQC could break. Bearby is already quantum-resistant.

**What does non-custodial mean?**
A non-custodial wallet means users — and only users — control their private keys. No company, server, or third party ever has access to keys or funds. Bearby generates and stores all keys locally on the device using on-device encryption. There is no account registration and zero data collection.

**Which blockchain networks does Bearby support?**
Bearby supports Bitcoin, Ethereum, and all EVM-compatible chains including Polygon, Arbitrum, Optimism, Base, Avalanche, Linea, and Zilliqa. Additional EVM chains can be added manually via custom RPC configuration.

**Is Bearby open source?**
Yes. Bearby's cryptographic core is written in Rust and published as open-source software at github.com/bearbywallet. The open-source model allows independent security researchers to audit the cryptographic implementation and key management logic.

## Contact

- Official website: https://bearby.io
- Twitter/X: https://x.com/BearbyPro
- GitHub: https://github.com/bearbywallet
- LinkedIn: https://www.linkedin.com/company/76457138`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
