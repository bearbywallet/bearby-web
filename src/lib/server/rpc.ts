// Server-side JSON-RPC pool + the `eth_call` allowlist for the farm page.
//
// The browser cannot talk to a public RPC (CSP `connect-src` is `'self'`), so
// every read goes through `/farm/api/*` routes that use this module. Only the
// farm's own contracts may be queried — the proxy must not become an open relay.

import { env } from '$env/dynamic/private';
import { POOL, VAULT_ADDRESS, WBTC, XAUT } from '$lib/web3/farm';

const DEFAULT_RPC_URLS =
	'https://eth.bearby.ru,https://eth.drpc.org,https://ethereum-rpc.publicnode.com';

const RPC_TIMEOUT_MS = 5000;
export const CALLDATA_PATTERN = /^0x[0-9a-fA-F]*$/;

/** Allows only the two tokens, the pool and the vault as `eth_call` targets. */
export function isCallAllowed(target: string): boolean {
	const allowed = [WBTC.toLowerCase(), XAUT.toLowerCase(), POOL.toLowerCase()];
	if (VAULT_ADDRESS) allowed.push(VAULT_ADDRESS);
	return allowed.includes(target.toLowerCase());
}

function rpcUrls(): string[] {
	const configured = (env.RPC_URLS ?? '').trim() || DEFAULT_RPC_URLS;
	return configured
		.split(',')
		.map((url) => url.trim())
		.filter(Boolean);
}

function resultOf(payload: unknown): string | null {
	if (payload && typeof payload === 'object' && 'result' in payload) {
		const result = payload.result;
		if (typeof result === 'string' && CALLDATA_PATTERN.test(result)) return result;
	}
	return null;
}

/**
 * `eth_call` at `latest`, trying each configured RPC in order.
 * Throws when every endpoint fails, so callers can degrade per field.
 */
export async function ethCall(to: string, data: string): Promise<string> {
	const body = JSON.stringify({
		jsonrpc: '2.0',
		id: 1,
		method: 'eth_call',
		params: [{ to, data }, 'latest']
	});

	for (const url of rpcUrls()) {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body,
				signal: AbortSignal.timeout(RPC_TIMEOUT_MS)
			});
			if (!response.ok) continue;
			const payload: unknown = await response.json();
			const result = resultOf(payload);
			if (result !== null) return result;
		} catch {
			// Node down or slow: fall through to the next endpoint.
		}
	}
	throw new Error('rpc unavailable');
}
