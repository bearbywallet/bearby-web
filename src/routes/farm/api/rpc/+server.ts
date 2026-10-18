import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CALLDATA_PATTERN, ethCall, isCallAllowed } from '$lib/server/rpc';

const TO_ADDRESS = /^0x[0-9a-fA-F]{40}$/;

const NO_STORE = { 'cache-control': 'no-store' };

/** Reads a `{ to, data }` pair from untrusted request JSON. */
function readCall(body: unknown): { to: string; data: string } | null {
	if (!body || typeof body !== 'object') return null;
	if (!('to' in body) || !('data' in body)) return null;
	const to = body.to;
	const data = body.data;
	if (typeof to !== 'string' || typeof data !== 'string') return null;
	return { to, data };
}

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'invalid json' }, { status: 400, headers: NO_STORE });
	}

	const call = readCall(body);
	if (!call || !TO_ADDRESS.test(call.to) || !CALLDATA_PATTERN.test(call.data)) {
		return json({ error: 'invalid call' }, { status: 400, headers: NO_STORE });
	}
	if (!isCallAllowed(call.to)) {
		return json({ error: 'forbidden target' }, { status: 400, headers: NO_STORE });
	}

	try {
		const result = await ethCall(call.to, call.data);
		return json({ result }, { headers: NO_STORE });
	} catch {
		return json({ error: 'rpc unavailable' }, { status: 502, headers: NO_STORE });
	}
};
