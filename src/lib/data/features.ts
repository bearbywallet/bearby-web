export type Feature = {
	title: string;
	description: string;
};

export const features: Feature[] = [
	{
		title: 'On-Device Key Storage',
		description:
			'Bearby stores your keys directly on your device, ensuring full control and security without external dependencies.'
	},
	{
		title: 'Zero Data Collection',
		description:
			'Bearby collects no user data whatsoever, prioritizing your privacy and autonomy at every step.'
	},
	{
		title: 'Unmatched Encryption Standards',
		description:
			'Leverage top-tier encryption with AES-256, PBKDF2, and BLAKE3 for unmatched security of your assets.'
	},
	{
		title: 'Local Transaction Signing',
		description:
			'All transactions are signed directly on your hardware, eliminating risks from remote processing.'
	}
];
