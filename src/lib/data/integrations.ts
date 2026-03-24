import * as m from '$lib/paraglide/messages';

export type Chain = {
	key: string;
	name: string;
	color: string;
};

export function getChains(): Chain[] {
	return [
		{ key: 'bitcoin', name: m.chain_bitcoin(), color: '#f7931a' },
		{ key: 'ethereum', name: m.chain_ethereum(), color: '#627eea' },
		{ key: 'bnb', name: m.chain_binance(), color: '#f3ba2f' },
		{ key: 'polygon', name: m.chain_polygon(), color: '#8247e5' },
		{ key: 'arbitrum', name: m.chain_arbitrum(), color: '#28a0f0' },
		{ key: 'optimism', name: m.chain_optimism(), color: '#ff0420' },
		{ key: 'base', name: m.chain_base(), color: '#0052ff' },
		{ key: 'avalanche', name: m.chain_avalanche(), color: '#e84142' },
		{ key: 'linea', name: m.chain_linea(), color: '#61dfff' },
		{ key: 'tron', name: m.chain_tron(), color: '#ef0027' }
	];
}
