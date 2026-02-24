import * as m from '$lib/paraglide/messages';

export type Feature = {
	title: string;
	description: string;
};

export function getFeatures(): Feature[] {
	return [
		{
			title: m.feature_key_storage_title(),
			description: m.feature_key_storage_desc()
		},
		{
			title: m.feature_zero_data_title(),
			description: m.feature_zero_data_desc()
		},
		{
			title: m.feature_encryption_title(),
			description: m.feature_encryption_desc()
		},
		{
			title: m.feature_signing_title(),
			description: m.feature_signing_desc()
		}
	];
}
