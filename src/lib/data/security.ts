import * as m from '$lib/paraglide/messages';

export type CryptoPrimitive = {
	name: string;
	label: string;
	description: string;
};

export function getCryptoPrimitives(): CryptoPrimitive[] {
	return [
		{
			name: 'NTRU Prime',
			label: m.crypto_ntru_label(),
			description: m.crypto_ntru_desc()
		},
		{
			name: 'Cyber',
			label: m.crypto_cyber_label(),
			description: m.crypto_cyber_desc()
		},
		{
			name: 'AES',
			label: m.crypto_aes_label(),
			description: m.crypto_aes_desc()
		},
		{
			name: 'Kuznechik',
			label: m.crypto_kuznechik_label(),
			description: m.crypto_kuznechik_desc()
		},
		{
			name: 'Argon2',
			label: m.crypto_argon2_label(),
			description: m.crypto_argon2_desc()
		}
	];
}
