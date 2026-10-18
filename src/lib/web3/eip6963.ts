// EIP-6963 multi-wallet discovery.
//
// Wallets announce themselves on `eip6963:announceProvider`; dispatching
// `eip6963:requestProvider` asks already-loaded wallets to announce. Wallets
// that only inject the legacy `window.ethereum` are surfaced as a fallback so
// the page still works outside a 6963-aware extension.

export interface Eip6963ProviderInfo {
	uuid: string;
	name: string;
	icon: string;
	rdns: string;
}

export interface Eip1193Provider {
	request(args: { method: string; params?: unknown[] }): Promise<unknown>;
	on?(event: string, callback: (...args: unknown[]) => void): void;
	removeListener?(event: string, callback: (...args: unknown[]) => void): void;
}

export interface Eip6963ProviderDetail {
	info: Eip6963ProviderInfo;
	provider: Eip1193Provider;
}

/** Window augmented with the legacy injected provider. */
declare global {
	interface Window {
		ethereum?: Eip1193Provider & { name?: string };
	}
}

const ANNOUNCE_EVENT = 'eip6963:announceProvider';
const REQUEST_EVENT = 'eip6963:requestProvider';

/**
 * Subscribes to provider announcements and pokes wallets to announce.
 * Returns a cleanup function; call it on component teardown.
 */
export function discoverProviders(onFound: (detail: Eip6963ProviderDetail) => void): () => void {
	if (typeof window === 'undefined') return () => {};

	const seen = new Set<string>();
	const announce = (event: Event) => {
		const custom = event as CustomEvent<Eip6963ProviderDetail>; // lib.dom types the event untyped
		const detail = custom.detail;
		if (!detail?.info || !detail.provider) return;
		const key = detail.info.rdns || detail.info.uuid;
		if (seen.has(key)) return;
		seen.add(key);
		onFound(detail);
	};

	window.addEventListener(ANNOUNCE_EVENT, announce);
	window.dispatchEvent(new Event(REQUEST_EVENT));

	// Legacy fallback: wallets without EIP-6963 support only expose
	// `window.ethereum`. Give announced wallets a moment to win first.
	const timer = window.setTimeout(() => {
		const injected = window.ethereum;
		if (!injected || seen.size > 0) return;
		seen.add('injected');
		onFound({
			info: {
				uuid: 'injected',
				name: injected.name || 'Injected Wallet',
				icon: '',
				rdns: 'injected'
			},
			provider: injected
		});
	}, 300);

	return () => {
		window.clearTimeout(timer);
		window.removeEventListener(ANNOUNCE_EVENT, announce);
	};
}
