// Wallet store for the farm page: EIP-6963 discovery, connection lifecycle and
// transaction helpers. Mirrors the rune-store shape of `stores/theme.svelte.ts`.

import {
	discoverProviders,
	type Eip1193Provider,
	type Eip6963ProviderDetail,
	type Eip6963ProviderInfo
} from './eip6963';
import { CHAIN_ID } from './farm';

const STORAGE_KEY = 'bearby.farm.wallet';
const BEARBY_PATTERN = /bearby/i;

interface ConnectedWallet {
	info: Eip6963ProviderInfo;
	provider: Eip1193Provider;
	address: string;
	chainId: number;
}

interface WalletState {
	providers: Eip6963ProviderDetail[];
	connected: ConnectedWallet | null;
	connecting: boolean;
	/** `'rejected'` when the user dismissed the wallet prompt. */
	error: '' | 'rejected' | 'failed';
}

export const wallet = $state<WalletState>({
	providers: [],
	connected: null,
	connecting: false,
	error: ''
});

/** Comma-free helper: Bearby first, then alphabetical, so the page leads with it. */
function sortProviders(list: Eip6963ProviderDetail[]): Eip6963ProviderDetail[] {
	return [...list].sort((a, b) => {
		const aBearby = BEARBY_PATTERN.test(a.info.rdns + a.info.name);
		const bBearby = BEARBY_PATTERN.test(b.info.rdns + b.info.name);
		if (aBearby !== bBearby) return aBearby ? -1 : 1;
		return a.info.name.localeCompare(b.info.name);
	});
}

/** RPC error code, when the wallet rejected the request (4001 = user cancelled). */
export function errorCode(error: unknown): number | null {
	if (error && typeof error === 'object' && 'code' in error) {
		const code = error.code;
		if (typeof code === 'number') return code;
	}
	return null;
}

function errorMessage(error: unknown): string {
	if (error && typeof error === 'object' && 'message' in error) {
		const message = error.message;
		if (typeof message === 'string') return message;
	}
	return String(error);
}

/** Reads `eth_accounts` (never prompts) and adopts the first account if present. */
async function adoptAccounts(detail: Eip6963ProviderDetail, chainId: number): Promise<boolean> {
	const accounts = await detail.provider.request({ method: 'eth_accounts' });
	if (!Array.isArray(accounts) || typeof accounts[0] !== 'string') return false;
	setConnection(detail, accounts[0], chainId);
	attachListeners(detail);
	return true;
}

let accountsHandler: ((...args: unknown[]) => void) | null = null;
let chainHandler: ((...args: unknown[]) => void) | null = null;
let disconnectHandler: ((...args: unknown[]) => void) | null = null;

function detachListeners(): void {
	const provider = wallet.connected?.provider;
	if (provider) {
		if (accountsHandler && provider.removeListener) {
			provider.removeListener('accountsChanged', accountsHandler);
		}
		if (chainHandler && provider.removeListener) {
			provider.removeListener('chainChanged', chainHandler);
		}
		if (disconnectHandler && provider.removeListener) {
			provider.removeListener('disconnect', disconnectHandler);
		}
	}
	accountsHandler = null;
	chainHandler = null;
	disconnectHandler = null;
}

function attachListeners(detail: Eip6963ProviderDetail): void {
	detachListeners();
	const { provider } = detail;
	if (!provider.on) return;

	accountsHandler = (...args: unknown[]) => {
		const accounts = args[0];
		const current = wallet.connected;
		if (!current) return;
		if (!Array.isArray(accounts) || accounts.length === 0) {
			disconnect();
			return;
		}
		const next = accounts[0];
		if (typeof next === 'string') wallet.connected = { ...current, address: next };
	};
	chainHandler = (...args: unknown[]) => {
		const current = wallet.connected;
		const value = args[0];
		if (!current || typeof value !== 'string') return;
		wallet.connected = { ...current, chainId: parseInt(value, 16) };
	};
	disconnectHandler = () => disconnect();

	provider.on('accountsChanged', accountsHandler);
	provider.on('chainChanged', chainHandler);
	provider.on('disconnect', disconnectHandler);
}

function setConnection(detail: Eip6963ProviderDetail, address: string, chainId: number): void {
	wallet.connected = { info: detail.info, provider: detail.provider, address, chainId };
	wallet.error = '';
	try {
		localStorage.setItem(STORAGE_KEY, detail.info.rdns);
	} catch {
		// Private mode: persistence is optional.
	}
}

/**
 * Starts discovery and silently reconnects the wallet used last time.
 * Returns a cleanup function for `$effect`.
 */
export function initWallet(): () => void {
	if (typeof window === 'undefined') return () => {};

	let autoTried = false;

	const cleanup = discoverProviders(async (detail) => {
		const known = wallet.providers.some((p) => p.info.rdns === detail.info.rdns);
		if (!known) wallet.providers = sortProviders([...wallet.providers, detail]);
		if (autoTried) return;

		let lastUsed: string | null = null;
		try {
			lastUsed = localStorage.getItem(STORAGE_KEY);
		} catch {
			lastUsed = null;
		}
		if (!lastUsed || lastUsed !== detail.info.rdns || wallet.connected) return;

		autoTried = true;
		try {
			const chainHex = await detail.provider.request({ method: 'eth_chainId' });
			const chainId = typeof chainHex === 'string' ? parseInt(chainHex, 16) : CHAIN_ID;
			await adoptAccounts(detail, chainId);
		} catch {
			// Silent reconnect is best-effort; the modal stays available.
		}
	});

	return () => {
		cleanup();
		detachListeners();
	};
}

export async function connect(detail: Eip6963ProviderDetail): Promise<void> {
	wallet.connecting = true;
	wallet.error = '';
	try {
		const accounts = await detail.provider.request({ method: 'eth_requestAccounts' });
		if (!Array.isArray(accounts) || typeof accounts[0] !== 'string') {
			wallet.error = 'failed';
			return;
		}
		const chainHex = await detail.provider.request({ method: 'eth_chainId' });
		const chainId = typeof chainHex === 'string' ? parseInt(chainHex, 16) : CHAIN_ID;
		setConnection(detail, accounts[0], chainId);
		attachListeners(detail);
	} catch (error) {
		wallet.error = errorCode(error) === 4001 ? 'rejected' : 'failed';
		throw error;
	} finally {
		wallet.connecting = false;
	}
}

export function disconnect(): void {
	detachListeners();
	wallet.connected = null;
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// Nothing to clear.
	}
}

const ETHEREUM_CHAIN_PARAMS = {
	chainId: '0x1',
	chainName: 'Ethereum',
	nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
	rpcUrls: ['https://eth.llamarpc.com'],
	blockExplorerUrls: ['https://etherscan.io']
};

/** Switches the wallet to `chainId`, adding mainnet when the wallet lacks it. */
export async function ensureChain(chainId: number = CHAIN_ID): Promise<void> {
	const current = wallet.connected;
	if (!current || current.chainId === chainId) return;
	const hexId = '0x' + chainId.toString(16);
	try {
		await current.provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: hexId }]
		});
	} catch (error) {
		if (errorCode(error) !== 4902) throw error;
		await current.provider.request({
			method: 'wallet_addEthereumChain',
			params: [ETHEREUM_CHAIN_PARAMS]
		});
	}
}

export interface TxRequest {
	to: string;
	data: string;
	value?: string;
}

export async function sendTx(tx: TxRequest): Promise<string> {
	const current = wallet.connected;
	if (!current) throw new Error('wallet not connected');
	const params: Record<string, string> = { from: current.address, to: tx.to, data: tx.data };
	if (tx.value) params.value = tx.value;
	const hash = await current.provider.request({ method: 'eth_sendTransaction', params: [params] });
	if (typeof hash !== 'string') throw new Error('wallet returned no transaction hash');
	return hash;
}

const RECEIPT_POLL_MS = 3000;
const RECEIPT_MAX_POLLS = 100;

/** Polls for the receipt; throws when the transaction reverted. */
export async function waitForTx(hash: string): Promise<void> {
	const current = wallet.connected;
	if (!current) throw new Error('wallet not connected');
	for (let attempt = 0; attempt < RECEIPT_MAX_POLLS; attempt++) {
		const receipt = await current.provider.request({
			method: 'eth_getTransactionReceipt',
			params: [hash]
		});
		if (receipt && typeof receipt === 'object' && 'status' in receipt) {
			const status = receipt.status;
			if (status !== '0x1') throw new Error(`transaction reverted (${hash})`);
			return;
		}
		const { promise, resolve } = Promise.withResolvers<void>();
		setTimeout(resolve, RECEIPT_POLL_MS);
		await promise;
	}
	throw new Error(`transaction not mined (${hash})`);
}

export { errorMessage };
