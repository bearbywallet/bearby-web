import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	decodeBool,
	decodeInt,
	decodeUint,
	decodeUintPair,
	decodeSlot0,
	SELECTORS
} from '$lib/web3/abi';
import {
	ABLP_DECIMALS,
	POOL,
	VAULT_ADDRESS,
	WBTC_DECIMALS,
	XAUT_DECIMALS,
	fromWei,
	isFiatCurrency,
	priceXautPerBtc,
	type BotStats,
	type FarmStats,
	type FiatRate
} from '$lib/web3/farm';
import { ethCall } from '$lib/server/rpc';

const BOT_TIMEOUT_MS = 4000;
const NO_STORE = { 'cache-control': 'no-store' };

// Bot API (read-only observability endpoints only). Server-only module — never
// import this into client-side code, or the key ships to every visitor's browser.
// Rotation: change API_KEY in /etc/autobase-bot.env on the bot box, restart, then
// update this constant and redeploy.
const BOT_URL = 'https://farm.bearby.io';
const BOT_KEY = '94524e65ee1159cb82d9c9ccaa61c133078c42b9875b69d3f0b8ee28c9689c5c';

// Fetched here, not in the browser: CSP `connect-src` does not allow this host.
const RATES_URL = 'https://rates.bearby.io/convert';

/** `eth_call` that swallows failures so each stat degrades independently. */
async function read(to: string, data: string): Promise<string | null> {
	try {
		return await ethCall(to, data);
	} catch {
		return null;
	}
}

// Bot responses are untrusted JSON: the record cast is only a lookup aid, and
// every value read through it is validated before use.
function field(source: unknown, key: string): unknown {
	if (!source || typeof source !== 'object') return undefined;
	const record = source as Record<string, unknown>; // shape checked by callers
	return record[key];
}

function numericField(source: unknown, key: string): number | null {
	const value = field(source, key);
	return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function stringField(source: unknown, key: string): string | null {
	const value = field(source, key);
	return typeof value === 'string' ? value : null;
}

/** `GET {BOT_URL}{path}` with bearer auth; resolves to `null` on any failure. */
async function readBot(path: string): Promise<unknown> {
	try {
		const response = await fetch(BOT_URL.replace(/\/$/, '') + path, {
			headers: { authorization: `Bearer ${BOT_KEY}` },
			signal: AbortSignal.timeout(BOT_TIMEOUT_MS)
		});
		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	}
}

/**
 * Bot analytics, normalized to display units: rates come back as fractions
 * (0.12) and become percentages, `fees_value1` becomes XAUT.
 */
async function loadBot(): Promise<BotStats | null> {
	const [rewards, strategy] = await Promise.all([
		readBot('/rewards?days=30'),
		readBot('/strategy')
	]);
	if (rewards === null && strategy === null) return null;

	const feeApr = numericField(rewards, 'fee_apr');
	const timeInRange = numericField(rewards, 'time_in_range');
	const feesValue1 = numericField(rewards, 'fees_value1');
	const sigmaDaily = numericField(strategy, 'sigma_daily');

	return {
		feeApr: feeApr === null ? null : feeApr * 100,
		timeInRange: timeInRange === null ? null : timeInRange * 100,
		feesValue1: feesValue1 === null ? null : feesValue1 / 10 ** XAUT_DECIMALS,
		sigmaDaily: sigmaDaily === null ? null : sigmaDaily * 100,
		decision: stringField(strategy, 'decision') ?? stringField(strategy, 'last_decision')
	};
}

/** XAUT price in `currency`; `null` on any failure. Response is `[{ from, to, rate }]`. */
async function loadFiat(currency: string): Promise<FiatRate | null> {
	try {
		const response = await fetch(`${RATES_URL}?to=${currency}&for=XAUT`, {
			signal: AbortSignal.timeout(BOT_TIMEOUT_MS)
		});
		if (!response.ok) return null;
		const entries: unknown = await response.json();
		if (!Array.isArray(entries)) return null;
		const entry = entries.find(
			(item) => stringField(item, 'from') === 'XAUT' && stringField(item, 'to') === currency
		);
		const xautRate = numericField(entry, 'rate');
		return xautRate !== null && xautRate > 0 ? { currency, xautRate } : null;
	} catch {
		return null;
	}
}

export const GET: RequestHandler = async ({ url }) => {
	const vault = VAULT_ADDRESS;
	const currency = url.searchParams.get('currency') ?? '';

	const [slot0Hex, supplyHex, totalsHex, lowerHex, upperHex, rebalanceHex, pausedHex, bot, fiat] =
		await Promise.all([
			read(POOL, SELECTORS.slot0),
			vault ? read(vault, SELECTORS.totalSupply) : null,
			vault ? read(vault, SELECTORS.totalAmounts) : null,
			vault ? read(vault, SELECTORS.tickLower) : null,
			vault ? read(vault, SELECTORS.tickUpper) : null,
			vault ? read(vault, SELECTORS.lastRebalance) : null,
			vault ? read(vault, SELECTORS.paused) : null,
			loadBot(),
			isFiatCurrency(currency) ? loadFiat(currency) : null
		]);

	const slot0 = slot0Hex ? decodeSlot0(slot0Hex) : null;
	const totalSupply = supplyHex ? decodeUint(supplyHex) : null;
	const amounts = totalsHex ? decodeUintPair(totalsHex) : null;
	const tickLower = lowerHex ? decodeInt(lowerHex) : null;
	const tickUpper = upperHex ? decodeInt(upperHex) : null;
	const lastRebalance = rebalanceHex ? decodeUint(rebalanceHex) : null;
	const paused = pausedHex ? decodeBool(pausedHex) : null;

	const currentTick = slot0?.tick ?? null;
	const price = slot0 ? priceXautPerBtc(slot0.sqrtPriceX96) : null;

	const total0 = amounts?.[0] ?? null;
	const total1 = amounts?.[1] ?? null;
	const tvlWbtc = total0 === null ? null : fromWei(total0, WBTC_DECIMALS);
	const tvlXaut =
		total0 === null || total1 === null || price === null
			? null
			: fromWei(total0, WBTC_DECIMALS) * price + fromWei(total1, XAUT_DECIMALS);
	const sharePriceXaut =
		tvlXaut === null || totalSupply === null || totalSupply === 0n
			? null
			: tvlXaut / fromWei(totalSupply, ABLP_DECIMALS);

	const lower = tickLower === null ? null : Number(tickLower);
	const upper = tickUpper === null ? null : Number(tickUpper);
	const inRange =
		lower === null || upper === null || currentTick === null
			? null
			: lower <= currentTick && currentTick <= upper;

	const payload: FarmStats = {
		configured: vault !== null,
		vaultAddress: vault,
		totalSupply: totalSupply === null ? null : totalSupply.toString(),
		total0: total0 === null ? null : total0.toString(),
		total1: total1 === null ? null : total1.toString(),
		tickLower: lower,
		tickUpper: upper,
		currentTick,
		inRange,
		paused,
		lastRebalance: lastRebalance === null ? null : Number(lastRebalance),
		priceXautPerBtc: price,
		tvlWbtc,
		tvlXaut,
		sharePriceXaut,
		fiat,
		bot
	};

	return json(payload, { headers: NO_STORE });
};
