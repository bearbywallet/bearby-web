// AutoBase vault chain configuration, unit math and the read client.
//
// Reads never touch a public RPC from the browser: CSP allows only `'self'`, so
// every `eth_call` is proxied through the same-origin `/farm/api/rpc` route.

import {
	decodeUint,
	erc20Allowance,
	erc20BalanceOf,
	erc20Approve,
	vaultDeposit,
	vaultLockedUntil,
	vaultWithdraw
} from './abi';

export const CHAIN_ID = 1;
export const WBTC = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
export const WBTC_DECIMALS = 8;
export const XAUT = '0x68749665FF8D2d112Fa859AA293F07A622782F38';
export const XAUT_DECIMALS = 6;
/** Uniswap v3 WBTC/XAUT 0.3% pool (verified through factory `getPool`). */
export const POOL = '0xE8a1F39C16EEA2844E98f951D711Bb4Bb31557aD';
export const ABLP_DECIMALS = 18;

/**
 * AutoBaseVault — the ABLP share token (source: `autobase/src/AutoBaseVault.sol`).
 *
 * Not deployed yet, so this stays `null` and the page shows its "coming soon"
 * state. Once the vault is live, paste the mainnet address here: this constant is
 * the single switch — the stats endpoint, the RPC allowlist and the deposit /
 * withdraw panels all read it, no environment variable or other edit needed.
 */
export const VAULT: string | null = null;

const ADDRESS_PATTERN = /^0x[0-9a-fA-F]{40}$/;

function normalizedAddress(value: string | null): string | null {
	if (value === null || !ADDRESS_PATTERN.test(value)) return null;
	return value.toLowerCase();
}

/** Normalized vault address, or `null` while `VAULT` is unset/malformed. */
export const VAULT_ADDRESS: string | null = normalizedAddress(VAULT);

export const EXPLORER = 'https://etherscan.io';

/** 2% slippage tolerance on both deposit and withdraw. */
export const SLIPPAGE_BPS = 200;
export const DEADLINE_SECONDS = 1200;

const BPS_DENOMINATOR = 10000n;
/** Same 2% tolerance expressed as basis points kept (9800n). */
const KEEP_BPS = BigInt(10000 - SLIPPAGE_BPS);

export const toWei = (amount: number, decimals: number): bigint =>
	BigInt(Math.round(amount * 10 ** decimals));

export const fromWei = (amount: bigint, decimals: number): number =>
	Number(amount) / 10 ** decimals;

/** Parses a user-typed amount; empty or malformed input becomes `0`. */
export function parseAmount(value: string): number {
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** Human amount for display, trimmed to `digits` significant decimals. */
export function formatAmount(value: number | null, digits = 4): string {
	if (value === null || !Number.isFinite(value)) return '—';
	if (value === 0) return '0';
	if (value < 0.0001) return '<0.0001';
	return value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

/** `eth_call` through the same-origin proxy; throws on a proxy/RPC error. */
export async function rpcCall(to: string, data: string): Promise<string> {
	const response = await fetch('/farm/api/rpc', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ to, data })
	});
	const payload: unknown = await response.json().catch(() => null);
	if (!response.ok) {
		const message =
			payload && typeof payload === 'object' && 'error' in payload
				? String(payload.error)
				: `rpc ${response.status}`;
		throw new Error(message);
	}
	if (payload && typeof payload === 'object' && 'result' in payload) {
		return String(payload.result);
	}
	throw new Error('rpc: malformed response');
}

/**
 * Pool price in XAUT per whole WBTC.
 * Raw token1/token0 ratio is sqrtPrice²/2^192; the 8→6 decimal gap scales it by 100.
 */
export function priceXautPerBtc(sqrtPriceX96: bigint): number {
	if (sqrtPriceX96 <= 0n) return 0;
	const scale = 1_000_000n;
	const scaled = (sqrtPriceX96 * sqrtPriceX96 * scale) / (1n << 192n);
	return (Number(scaled) / Number(scale)) * 10 ** (WBTC_DECIMALS - XAUT_DECIMALS);
}

/** Same price formula for a tick boundary of the vault range. */
export const priceAtTick = (tick: number): number =>
	Math.pow(1.0001, tick) * 10 ** (WBTC_DECIMALS - XAUT_DECIMALS);

export interface BotStats {
	feeApr: number | null;
	timeInRange: number | null;
	feesValue1: number | null;
	sigmaDaily: number | null;
	decision: string | null;
}

export interface FarmStats {
	configured: boolean;
	vaultAddress: string | null;
	totalSupply: string | null;
	total0: string | null;
	total1: string | null;
	tickLower: number | null;
	tickUpper: number | null;
	currentTick: number | null;
	inRange: boolean | null;
	paused: boolean | null;
	lastRebalance: number | null;
	priceXautPerBtc: number | null;
	tvlWbtc: number | null;
	tvlXaut: number | null;
	sharePriceXaut: number | null;
	bot: BotStats | null;
}

/** Per-wallet state; bigint quantities stay strings across the wire. */
export interface UserFarmData {
	address: string;
	wbtcBalance: string | null;
	xautBalance: string | null;
	ablpBalance: string | null;
	wbtcAllowance: string | null;
	xautAllowance: string | null;
	lockedUntil: number | null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
	if (!value || typeof value !== 'object') return null;
	// JSON boundary: values are re-validated field by field below.
	return value as Record<string, unknown>;
}

const numOrNull = (value: unknown): number | null =>
	typeof value === 'number' && Number.isFinite(value) ? value : null;
const strOrNull = (value: unknown): string | null => (typeof value === 'string' ? value : null);
const boolOrNull = (value: unknown): boolean | null => (typeof value === 'boolean' ? value : null);

/** Validates a `/farm/api/stats` payload into `FarmStats`; `null` when malformed. */
export function parseStats(payload: unknown): FarmStats | null {
	const source = asRecord(payload);
	if (!source) return null;

	const botSource = asRecord(source.bot);
	const bot: BotStats | null = botSource
		? {
				feeApr: numOrNull(botSource.feeApr),
				timeInRange: numOrNull(botSource.timeInRange),
				feesValue1: numOrNull(botSource.feesValue1),
				sigmaDaily: numOrNull(botSource.sigmaDaily),
				decision: strOrNull(botSource.decision)
			}
		: null;

	return {
		configured: source.configured === true,
		vaultAddress: strOrNull(source.vaultAddress),
		totalSupply: strOrNull(source.totalSupply),
		total0: strOrNull(source.total0),
		total1: strOrNull(source.total1),
		tickLower: numOrNull(source.tickLower),
		tickUpper: numOrNull(source.tickUpper),
		currentTick: numOrNull(source.currentTick),
		inRange: boolOrNull(source.inRange),
		paused: boolOrNull(source.paused),
		lastRebalance: numOrNull(source.lastRebalance),
		priceXautPerBtc: numOrNull(source.priceXautPerBtc),
		tvlWbtc: numOrNull(source.tvlWbtc),
		tvlXaut: numOrNull(source.tvlXaut),
		sharePriceXaut: numOrNull(source.sharePriceXaut),
		bot
	};
}

export interface DepositPlan {
	amount0Wei: bigint;
	amount1Wei: bigint;
	/** Best guess at minted shares, for the "expected" line in the UI. */
	expectedSharesWei: bigint;
	/** Floor for minted shares: expected value minus slippage. */
	minSharesWei: bigint;
}

/**
 * Share floor for a deposit: the deposited XAUT value divided by the current
 * share price, minus the slippage tolerance. `0n` when the vault holds nothing
 * yet (genesis deposit mints 1:1) or the share price is unknown.
 */
export function planDeposit(
	amountWbtc: number,
	amountXaut: number,
	stats: FarmStats | null
): DepositPlan {
	const amount0Wei = toWei(amountWbtc, WBTC_DECIMALS);
	const amount1Wei = toWei(amountXaut, XAUT_DECIMALS);
	const price = stats?.priceXautPerBtc ?? 0;
	const expectedValueXaut = amountWbtc * price + amountXaut;
	const sharePrice = stats?.sharePriceXaut ?? 0;
	let expectedSharesWei = 0n;
	if (sharePrice > 0 && expectedValueXaut > 0) {
		expectedSharesWei = BigInt(Math.floor((expectedValueXaut / sharePrice) * 10 ** ABLP_DECIMALS));
	}
	return {
		amount0Wei,
		amount1Wei,
		expectedSharesWei,
		minSharesWei: (expectedSharesWei * KEEP_BPS) / BPS_DENOMINATOR
	};
}

export interface WithdrawPlan {
	expected0Wei: bigint;
	expected1Wei: bigint;
	min0Wei: bigint;
	min1Wei: bigint;
}

/** Pro-rata token amounts for a share amount, plus slippage floors. */
export function planWithdraw(sharesWei: bigint, stats: FarmStats | null): WithdrawPlan | null {
	if (!stats?.totalSupply || !stats.total0 || !stats.total1) return null;
	const supply = BigInt(stats.totalSupply);
	if (supply === 0n) return null;
	const expected0Wei = (sharesWei * BigInt(stats.total0)) / supply;
	const expected1Wei = (sharesWei * BigInt(stats.total1)) / supply;
	return {
		expected0Wei,
		expected1Wei,
		min0Wei: (expected0Wei * KEEP_BPS) / BPS_DENOMINATOR,
		min1Wei: (expected1Wei * KEEP_BPS) / BPS_DENOMINATOR
	};
}

/** Calldata for a deposit, with the deadline stamped at call time. */
export function buildDepositCalldata(
	vault: string,
	amountWbtc: number,
	amountXaut: number,
	stats: FarmStats | null
): { to: string; data: string } {
	const plan = planDeposit(amountWbtc, amountXaut, stats);
	const deadline = BigInt(Math.floor(Date.now() / 1000) + DEADLINE_SECONDS);
	return {
		to: vault,
		data: vaultDeposit(plan.amount0Wei, plan.amount1Wei, plan.minSharesWei, deadline)
	};
}

/** Calldata for a withdraw; returns `null` when stats are too incomplete to bound it. */
export function buildWithdrawCalldata(
	vault: string,
	sharesWei: bigint,
	stats: FarmStats | null
): { to: string; data: string } | null {
	const plan = planWithdraw(sharesWei, stats);
	if (!plan) return null;
	const deadline = BigInt(Math.floor(Date.now() / 1000) + DEADLINE_SECONDS);
	return {
		to: vault,
		data: vaultWithdraw(sharesWei, plan.min0Wei, plan.min1Wei, deadline)
	};
}

/** Reads every wallet-specific value the panels need, in parallel. */
export async function loadUserData(owner: string, vault: string | null): Promise<UserFarmData> {
	const [wbtcBalance, xautBalance, ablpBalance, wbtcAllowance, xautAllowance, lockedUntil] =
		await Promise.all([
			readHex(WBTC, erc20BalanceOf(owner)),
			readHex(XAUT, erc20BalanceOf(owner)),
			vault ? readHex(vault, erc20BalanceOf(owner)) : null,
			vault ? readHex(WBTC, erc20Allowance(owner, vault)) : null,
			vault ? readHex(XAUT, erc20Allowance(owner, vault)) : null,
			vault ? readHex(vault, vaultLockedUntil(owner)) : null
		]);

	const uint = (hex: string | null) => (hex ? (decodeUint(hex)?.toString() ?? null) : null);
	const lock = lockedUntil ? decodeUint(lockedUntil) : null;

	return {
		address: owner,
		wbtcBalance: uint(wbtcBalance),
		xautBalance: uint(xautBalance),
		ablpBalance: uint(ablpBalance),
		wbtcAllowance: uint(wbtcAllowance),
		xautAllowance: uint(xautAllowance),
		lockedUntil: lock === null ? null : Number(lock)
	};
}

/** `rpcCall` that swallows failures into `null` so panels degrade per-field. */
async function readHex(to: string, data: string): Promise<string | null> {
	try {
		return await rpcCall(to, data);
	} catch {
		return null;
	}
}

/** Approve calldata for a token allowance, when it is still below the amount. */
export function buildApproveCalldata(
	token: string,
	spender: string,
	amountWei: bigint
): { to: string; data: string } {
	return { to: token, data: erc20Approve(spender, amountWei) };
}
