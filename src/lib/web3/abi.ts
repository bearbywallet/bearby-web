// Hand-rolled ABI encoding/decoding for the AutoBase farm page.
//
// The site is intentionally dependency-free, and every call the page makes has
// only static arguments (uint256 / address), so calldata can be assembled from
// 32-byte words without a contract ABI library.
//
// Every selector below was verified with `cast sig` (foundry) — the signature is
// noted next to each entry so the table can be re-checked at any time.

const word = (value: bigint): string => value.toString(16).padStart(64, '0');

const wordAddr = (address: string): string =>
	address.toLowerCase().replace(/^0x/, '').padStart(64, '0');

export const SELECTORS = {
	deposit: '0x2505c3d9', // deposit(uint256,uint256,uint256,uint256)
	withdraw: '0x674fb1b4', // withdraw(uint256,uint256,uint256,uint256)
	lockedUntil: '0x9bc289f1', // lockedUntil(address)
	totalSupply: '0x18160ddd', // totalSupply()
	balanceOf: '0x70a08231', // balanceOf(address)
	tickLower: '0x59c4f905', // tickLower()
	tickUpper: '0x55b812a8', // tickUpper()
	lastRebalance: '0x106b9ca1', // lastRebalance()
	totalAmounts: '0x0c6ffc29', // totalAmounts()
	positionLiquidity: '0x7211dc36', // positionLiquidity()
	paused: '0x5c975abb', // paused()
	slot0: '0x3850c7bd', // slot0()
	approve: '0x095ea7b3', // approve(address,uint256)
	allowance: '0xdd62ed3e' // allowance(address,address)
} as const;

/* ---------------------------------------------------------------- builders */

export const erc20BalanceOf = (owner: string): string => SELECTORS.balanceOf + wordAddr(owner);

export const erc20Allowance = (owner: string, spender: string): string =>
	SELECTORS.allowance + wordAddr(owner) + wordAddr(spender);

export const erc20Approve = (spender: string, amount: bigint): string =>
	SELECTORS.approve + wordAddr(spender) + word(amount);

export const vaultDeposit = (
	amount0: bigint,
	amount1: bigint,
	minShares: bigint,
	deadline: bigint
): string => SELECTORS.deposit + word(amount0) + word(amount1) + word(minShares) + word(deadline);

export const vaultWithdraw = (
	shares: bigint,
	min0: bigint,
	min1: bigint,
	deadline: bigint
): string => SELECTORS.withdraw + word(shares) + word(min0) + word(min1) + word(deadline);

// Argument-free views (`totalSupply()`, `tickLower()`, `slot0()`, …) need no
// builder — call sites use `SELECTORS.<name>` directly.

export const vaultLockedUntil = (account: string): string =>
	SELECTORS.lockedUntil + wordAddr(account);

/* ---------------------------------------------------------------- decoders */

/** Splits a `0x`-prefixed return blob into 32-byte words (no prefix). */
function words(hex: string): string[] {
	const body = hex.replace(/^0x/i, '');
	const out: string[] = [];
	for (let i = 0; i + 64 <= body.length; i += 64) out.push(body.slice(i, i + 64));
	return out;
}

const asBigInt = (w: string | undefined): bigint | null => (w ? BigInt('0x' + w) : null);

/** First word as an unsigned integer, or `null` for an empty/short result. */
export function decodeUint(hex: string): bigint | null {
	return asBigInt(words(hex)[0]);
}

/** First word as a boolean; `null` when the result is empty. */
export function decodeBool(hex: string): boolean | null {
	const raw = decodeUint(hex);
	return raw === null ? null : raw !== 0n;
}

/** Two consecutive words as unsigned integers: `totalAmounts()` etc. */
export function decodeUintPair(hex: string): [bigint, bigint] | null {
	const w = words(hex);
	if (w.length < 2) return null;
	return [BigInt('0x' + w[0]), BigInt('0x' + w[1])];
}

/** Uniswap v3 `slot0()`: word 0 is sqrtPriceX96, word 1 is the current tick. */
export function decodeSlot0(hex: string): { sqrtPriceX96: bigint; tick: number } | null {
	const w = words(hex);
	if (w.length < 2) return null;
	const sqrtPriceX96 = BigInt('0x' + w[0]);
	let tickRaw = BigInt('0x' + w[1]);
	if (tickRaw >= 1n << 255n) tickRaw -= 1n << 256n;
	return { sqrtPriceX96, tick: Number(tickRaw) };
}
