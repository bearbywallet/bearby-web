export type CryptoPrimitive = {
	name: string;
	label: string;
	description: string;
};

export const cryptoPrimitives: CryptoPrimitive[] = [
	{
		name: 'NTRU Prime',
		label: 'Post-Quantum',
		description: 'Lattice-based cryptography providing future-proof resistance against quantum computing attacks.'
	},
	{
		name: 'Cyber',
		label: 'Blockchain Ops',
		description: 'Advanced cryptographic library optimized for high-performance blockchain operations.'
	},
	{
		name: 'AES',
		label: 'Symmetric',
		description: 'Industry-standard 256-bit symmetric encryption protecting data at rest and in transit.'
	},
	{
		name: 'Kuznechik',
		label: 'GOST R 34.12',
		description: 'Russian federal encryption standard adding an independent layer of cryptographic security.'
	},
	{
		name: 'Argon2',
		label: 'Key Derivation',
		description: 'Memory-hard function for secure password hashing resistant to GPU and ASIC attacks.'
	}
];
