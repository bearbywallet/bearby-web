import { API_URL } from '$lib/constants';

/**
 * Waitlist joining with a hashcash-style proof of work.
 *
 * The client must find a `nonce` such that sha256(email + nonce) starts with
 * POW_DIFFICULTY zero bits (~2^20 hashes on average, well under a second on
 * a modern device). The server verifies the digest in O(1) — this keeps the
 * endpoint useless for bulk spam without any captchas or third parties.
 */

export const POW_DIFFICULTY = 20;

const K = new Uint32Array([
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);

const IV = [
	0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
] as const;

// Scratch (single-threaded hot loop — reuse instead of allocating per hash).
const W = new Uint32Array(64);
const STATE = new Uint32Array(8);

const rotr = (x: number, n: number) => ((x >>> n) | (x << (32 - n))) >>> 0;

/** One sha256 compression round over a 64-byte block, result in STATE. */
function compress(block: DataView): void {
	for (let i = 0; i < 16; i++) W[i] = block.getUint32(i * 4);

	for (let i = 16; i < 64; i++) {
		const s0 = rotr(W[i - 15], 7) ^ rotr(W[i - 15], 18) ^ (W[i - 15] >>> 3);
		const s1 = rotr(W[i - 2], 17) ^ rotr(W[i - 2], 19) ^ (W[i - 2] >>> 10);
		W[i] = (W[i - 16] + s0 + W[i - 7] + s1) >>> 0;
	}

	let a = STATE[0],
		b = STATE[1],
		c = STATE[2],
		d = STATE[3],
		e = STATE[4],
		f = STATE[5],
		g = STATE[6],
		h = STATE[7];

	for (let i = 0; i < 64; i++) {
		const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
		const ch = (e & f) ^ (~e & g);
		const t1 = (h + S1 + ch + K[i] + W[i]) >>> 0;
		const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
		const maj = (a & b) ^ (a & c) ^ (b & c);
		const t2 = (S0 + maj) >>> 0;
		h = g;
		g = f;
		f = e;
		e = (d + t1) >>> 0;
		d = c;
		c = b;
		b = a;
		a = (t1 + t2) >>> 0;
	}

	STATE[0] = (STATE[0] + a) >>> 0;
	STATE[1] = (STATE[1] + b) >>> 0;
	STATE[2] = (STATE[2] + c) >>> 0;
	STATE[3] = (STATE[3] + d) >>> 0;
	STATE[4] = (STATE[4] + e) >>> 0;
	STATE[5] = (STATE[5] + f) >>> 0;
	STATE[6] = (STATE[6] + g) >>> 0;
	STATE[7] = (STATE[7] + h) >>> 0;
}

/** Synchronous SHA-256 — crypto.subtle would make ~10^6 awaits unusably slow. */
export function sha256(bytes: Uint8Array): Uint8Array {
	const len = bytes.length;
	const total = ((len + 9 + 63) >> 6) << 6;
	const buf = new Uint8Array(total);
	buf.set(bytes);
	buf[len] = 0x80;

	const view = new DataView(buf.buffer);
	view.setUint32(total - 8, Math.floor(len / 0x20000000));
	view.setUint32(total - 4, (len << 3) >>> 0);

	STATE.set(IV);

	for (let off = 0; off < total; off += 64) compress(new DataView(buf.buffer, off));

	const out = new Uint8Array(32);
	const o = new DataView(out.buffer);
	for (let i = 0; i < 8; i++) o.setUint32(i * 4, STATE[i]);

	return out;
}

export function leading_zero_bits(digest: Uint8Array): number {
	let bits = 0;

	for (const byte of digest) {
		if (byte === 0) {
			bits += 8;
		} else {
			bits += Math.clz32(byte) - 24;
			break;
		}
	}

	return bits;
}

const enc = new TextEncoder();
const DIGITS = new Uint8Array(20);

/** Leading zero bits of the current 8-word digest state. */
function state_zero_bits(): number {
	let bits = 0;

	for (let i = 0; i < 8; i++) {
		const word = STATE[i];
		if (word === 0) {
			bits += 32;
		} else {
			bits += Math.clz32(word);
			break;
		}
	}

	return bits;
}

/** Finds a nonce so sha256(email + nonce) has >= `difficulty` leading zero bits. */
export async function mine_pow(
	email: string,
	difficulty: number = POW_DIFFICULTY,
	onprogress?: (percent: number) => void
): Promise<string> {
	const prefix = enc.encode(email);
	const base_len = prefix.length;
	const expected = 2 ** difficulty;
	let nonce = 0;

	// Fast path: message + padding fits one 64-byte block (emails always do).
	const can_fast = base_len + 20 <= 55;
	const block = new Uint8Array(64);
	const bv = new DataView(block.buffer);

	// Slow path for absurdly long addresses.
	const buf = new Uint8Array(Math.max(base_len + 20, 64));

	while (true) {
		for (let i = 0; i < 20000; i++, nonce++) {
			let n = nonce;
			let d = 0;

			do {
				DIGITS[d++] = 48 + (n % 10);
				n = (n / 10) | 0;
			} while (n > 0);

			let bits: number;

			if (can_fast) {
				const len = base_len + d;
				block.fill(0);
				block.set(prefix);

				for (let j = 0; j < d; j++) block[base_len + j] = DIGITS[d - 1 - j];

				block[len] = 0x80;
				bv.setUint32(56, 0);
				bv.setUint32(60, len << 3);

				STATE.set(IV);
				compress(bv);
				bits = state_zero_bits();
			} else {
				buf.set(prefix);
				for (let j = 0; j < d; j++) buf[base_len + j] = DIGITS[d - 1 - j];
				bits = leading_zero_bits(sha256(buf.subarray(0, base_len + d)));
			}

			if (bits >= difficulty) return String(nonce);
		}

		onprogress?.(Math.min(99, Math.round((nonce / expected) * 100)));
		await new Promise((r) => setTimeout(r));
	}
}

export async function join_waitlist(
	email: string,
	onprogress?: (percent: number) => void
): Promise<{ ok: boolean; error?: string }> {
	const normalized = email.trim().toLowerCase();

	let nonce: string;

	try {
		nonce = await mine_pow(normalized, POW_DIFFICULTY, onprogress);
	} catch {
		return { ok: false, error: 'pow' };
	}

	try {
		const res = await fetch(`${API_URL}/api/v1/waitlist`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: normalized, nonce })
		});

		if (res.ok) return { ok: true };

		const data = (await res.json().catch(() => null)) as { code?: number } | null;
		return { ok: false, error: data?.code === -3 ? 'pow' : 'server' };
	} catch {
		return { ok: false, error: 'network' };
	}
}

/** Verifies the 6-digit code that was emailed to the user. */
export async function confirm_waitlist(email: string, code: string): Promise<{ ok: boolean; error?: string }> {
	const normalized = email.trim().toLowerCase();

	try {
		const res = await fetch(
			`${API_URL}/api/v1/waitlist/confirm?email=${encodeURIComponent(normalized)}&code=${encodeURIComponent(code)}`
		);

		if (res.ok) return { ok: true };

		const data = (await res.json().catch(() => null)) as { code?: number } | null;
		const error =
			data?.code === -7 ? 'wrong' : data?.code === -8 ? 'expired' : data?.code === -9 ? 'too_many' : 'server';
		return { ok: false, error };
	} catch {
		return { ok: false, error: 'network' };
	}
}
