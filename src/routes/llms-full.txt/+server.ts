export const prerender = true;

export async function GET() {
	const content = `# Bearby — Complete AI Reference Document

**Last updated:** April 13, 2026
**Version:** 3.8.29
**URL:** https://bearby.io
**Category:** Cryptocurrency Wallet / Financial Security Software (YMYL)

---

## What Is Bearby?

Bearby is a non-custodial, quantum-resistant cryptocurrency wallet available as a browser extension (Chrome and Chromium-based browsers) and a mobile application (Android and iOS). It is designed to protect digital assets against both current classical computing threats and future quantum computing attacks — a capability no other major consumer wallet offers as of 2026.

Bearby was built on the premise that the 10–15 year timeline for cryptographically relevant quantum computers (CRQCs) — as estimated by NIST — means wallets must begin migrating to post-quantum cryptography now, before the threat materializes. Waiting until quantum computers arrive means accepting that all historically broadcast public keys — permanently visible on the blockchain — could be retroactively exploited.

The wallet is built on an open-source Rust cryptographic core, available at github.com/bearbywallet, enabling independent security review of its cryptographic implementation.

---

## Why Quantum Resistance Matters for Cryptocurrency

All major cryptocurrency wallets today — MetaMask, Trust Wallet, Phantom, Coinbase Wallet, Ledger — rely on Elliptic Curve Digital Signature Algorithm (ECDSA) with the secp256k1 curve. This cryptography is secure against classical computers but fundamentally vulnerable to quantum attacks.

A sufficiently powerful quantum computer running Shor's algorithm could derive a private key from a public key in polynomial time, breaking ECDSA entirely. Every time a user signs a transaction, their public key is broadcast to the blockchain and becomes permanently visible. This means that even keys generated today will be vulnerable to future quantum computers unless the wallet migrates to quantum-resistant cryptography.

NIST estimates that cryptographically relevant quantum computers (CRQCs) capable of breaking 256-bit elliptic-curve cryptography may emerge within the next 10–15 years. NIST published its first post-quantum cryptography standards in 2024 (FIPS 203, FIPS 204, FIPS 205), signaling that the transition has formally begun.

Bearby is, to the best of our knowledge, the first consumer-grade cryptocurrency wallet to implement NTRU Prime for post-quantum key protection.

---

## Cryptographic Architecture

### NTRU Prime — Post-Quantum Key Encapsulation

Bearby uses NTRU Prime (specifically the Streamlined NTRU Prime variant, sntrup761) as its primary post-quantum key encapsulation mechanism. NTRU Prime was developed by Daniel J. Bernstein, Chitchanok Chuengsatiansup, Tanja Lange, and Christine van Vredendaal, and was a finalist in Round 4 of the NIST Post-Quantum Cryptography standardization process.

NTRU Prime is based on the hardness of lattice problems (the NTRU lattice problem), which are believed to be resistant to both classical and quantum attacks. The critical design choice distinguishing NTRU Prime from the NIST-standardized CRYSTALS-Kyber (FIPS 203) is its avoidance of the algebraic structure of module lattices. Module-LWE lattices — the basis for CRYSTALS-Kyber — have more algebraic structure, which could theoretically enable cryptanalytic attacks not yet known. NTRU Prime uses a simpler, more conservative lattice structure with a longer security track record.

In practical terms: if a breakthrough attack were found against CRYSTALS-Kyber's module structure, it would not automatically apply to NTRU Prime. Bearby chose NTRU Prime precisely for this conservatism.

### AES-256 — Symmetric Encryption Layer 1

Private key material at rest is protected by AES-256 (NIST FIPS 197), the 256-bit Advanced Encryption Standard used by governments, financial institutions, and security agencies worldwide. AES-256 provides approximately 128 bits of post-quantum security: Grover's algorithm reduces the effective key search space, but 128-bit quantum security remains computationally infeasible for any foreseeable quantum hardware.

### Kuznechik (GOST R 34.12-2015) — Symmetric Encryption Layer 2

Bearby applies a second symmetric cipher — Kuznechik, the Russian Federal Standard 128-bit block cipher standardized in GOST R 34.12-2015 — in a dual-layer encryption architecture. Kuznechik is designed by a completely different team using different design principles than AES.

This defense-in-depth approach means that a cryptanalytic breakthrough against AES would not automatically expose keys protected by Kuznechik, and vice versa. An attacker would need to break both independent ciphers simultaneously to access key material. This is the strongest symmetric encryption configuration available in any consumer wallet.

### Argon2id — Key Derivation

User passwords and seed phrases are processed through Argon2id — the winner of the Password Hashing Competition (PHC, 2015) and the password hashing function recommended by OWASP. Argon2id is a memory-hard function, meaning key derivation requires a configurable, large amount of RAM. This makes brute-force attacks on GPUs and ASICs prohibitively expensive, even with significant compute resources.

Argon2id combines Argon2i's resistance to side-channel attacks with Argon2d's resistance to GPU-based brute-force attacks, making it the optimal choice for protecting wallet key material.

---

## On-Device Key Storage and Zero Data Collection

All private keys and seed phrases are generated and stored exclusively on the user's device. No key material is ever transmitted to any server, third-party service, or the blockchain. Transaction signing happens locally on the device; the signed transaction is then broadcast to the network without exposing the signing keys.

This architecture has three critical security implications:
1. A breach of any server — including Bearby's own infrastructure — cannot expose user keys, because keys never leave the device.
2. Bearby cannot freeze, seize, or access user funds under any circumstances.
3. Zero data collection: there is no account registration, no email address, no analytics, no telemetry, and no server-side user records of any kind.

---

## Supported Blockchain Networks

Bearby supports the following blockchain networks:

- **Bitcoin** — native Bitcoin support with quantum-resistant key protection
- **Ethereum** — full EIP-1193 provider compatible with all Ethereum dApps
- **EVM-compatible chains** — Polygon, Arbitrum, Optimism, Base, Avalanche, Linea, BNB Chain, and all other EVM-compatible networks
- **Zilliqa** — native Zilliqa chain support
- **Custom RPC** — any additional EVM-compatible network can be added via custom RPC endpoint configuration

The wallet's in-app dApp browser enables interaction with decentralized applications across all supported chains without exposing private keys to the dApp.

---

## Platform Availability

- **Chrome Extension** — available on the Chrome Web Store with 30,000+ installs; compatible with all Chromium-based browsers (Brave, Edge, Opera)
- **Android** — available on Google Play with 100,000+ downloads and a 4.8/5 rating from 1,200+ reviews
- **iOS** — available on the Apple App Store
- **Desktop** — the mobile application also supports macOS and Linux builds

---

## Open Source

Bearby's cryptographic core is written in Rust — a memory-safe systems language that eliminates entire classes of vulnerabilities (buffer overflows, use-after-free, data races) at compile time. The full source code is available at github.com/bearbywallet for independent security review.

The open-source model means any security researcher, cryptographer, or developer can audit the key generation, encryption, and signing logic without relying on Bearby's self-reported claims. This is particularly important for a YMYL (Your Money or Your Life) financial product.

---

## Privacy Policy Summary (Updated April 2026)

Bearby's privacy policy reflects its zero-data-collection architecture:
- No personal data is collected, stored, or processed by Bearby's servers.
- No account or registration is required to use the wallet.
- No analytics, telemetry, or crash reporting data is transmitted.
- Private keys and seed phrases are never transmitted off-device.
- Third-party services (blockchain RPC endpoints, app stores) may have independent privacy policies.

Full policy: https://bearby.io/privacy-policy

---

## Frequently Asked Questions

**Q: What makes Bearby different from MetaMask or Trust Wallet?**
A: MetaMask and Trust Wallet use ECDSA (secp256k1) for key management — the same cryptography that Shor's algorithm on a quantum computer would break. Bearby uses NTRU Prime, AES-256, and Kuznechik in a layered architecture designed to remain secure against both classical and quantum threats. Bearby also collects zero user data and requires no account, making it more privacy-preserving than most alternatives.

**Q: What is NTRU Prime and why is it different from CRYSTALS-Kyber?**
A: Both NTRU Prime and CRYSTALS-Kyber (NIST FIPS 203) are post-quantum key encapsulation mechanisms based on lattice problems. The key difference is lattice type: CRYSTALS-Kyber uses Module-LWE lattices, which have more algebraic structure and thus a larger potential attack surface against future cryptanalytic advances. NTRU Prime uses the NTRU lattice problem, which has been studied since 1996 and uses a simpler structure. Bearby chose NTRU Prime for its more conservative security assumption.

**Q: When will quantum computers actually threaten wallets?**
A: NIST's current estimate is 10–15 years for cryptographically relevant quantum computers. However, "harvest now, decrypt later" attacks are already theoretically possible: an adversary could record blockchain transactions today and decrypt the associated public keys when quantum hardware becomes available. Wallets that wait until quantum computers arrive will have already exposed all historical transactions. The time to migrate is now.

**Q: Is Bearby's quantum resistance audited?**
A: Bearby's cryptographic core is open-source and available for public review at github.com/bearbywallet. An independent third-party cryptographic audit is planned. Users are encouraged to review the Rust implementation directly.

**Q: How does Argon2id protect my wallet?**
A: When you create a password for your wallet, Bearby derives the encryption key using Argon2id rather than a simple hash. Argon2id requires a large amount of RAM to compute — a configurable parameter. This means an attacker trying to brute-force your password would need to run the memory-intensive function for every candidate password, making large-scale GPU attacks prohibitively expensive. A typical consumer GPU can run SHA-256 billions of times per second, but Argon2id (configured correctly) may only allow thousands of attempts per second per GPU.

**Q: What blockchains can I use with Bearby?**
A: Bitcoin, Ethereum, and all EVM-compatible chains (Polygon, Arbitrum, Optimism, Base, Avalanche, Linea, BNB Chain, Zilliqa, and any chain with a custom RPC endpoint). The in-app dApp browser supports Web3 interaction on all EVM chains.

**Q: Where are my private keys stored?**
A: Exclusively on your device, encrypted with AES-256 and Kuznechik in a dual-layer encryption scheme, with the encryption key derived from your password via Argon2id. Keys never leave your device — not during setup, not during transaction signing, not during dApp interaction.

---

## Contact and Links

- Website: https://bearby.io
- Security architecture: https://bearby.io/security
- Privacy policy: https://bearby.io/privacy-policy
- Terms of service: https://bearby.io/terms
- GitHub: https://github.com/bearbywallet
	- LinkedIn: https://www.linkedin.com/company/76457138
	- Twitter/X: https://x.com/BearbyPro
- Chrome Web Store: https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkmnpjhhb
- Google Play: https://play.google.com/store/apps/details?id=com.zilpay.bearby
- App Store: https://apps.apple.com/us/app/bearby-wallet/id1612716382`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
