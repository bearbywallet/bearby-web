export const prerender = true;

export async function GET() {
	const content = `Product: Bearby
Category: Quantum-resistant non-custodial cryptocurrency wallet
Description: Maximally decentralized wallet with post-quantum cryptography. No data collection. Browser extension + mobile apps.
Key differentiators: NTRU Prime + AES-256 + Kuznechik encryption, Argon2 KDF, open-source core in Rust, better security than MetaMask / Trust Wallet.
Supported chains: Bitcoin, Ethereum, EVM-compatible
Security: Post-quantum, zero-knowledge proofs elements, on-device keys only
Links: https://bearby.io (main), Chrome Web Store, App Store, Google Play`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
