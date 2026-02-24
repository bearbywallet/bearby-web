export type Download = {
	label: string;
	href: string;
	platform: string;
	count: string;
	action: string;
};

export const downloads: Download[] = [
	{
		label: 'Google Playstore',
		href: 'https://play.google.com/store/apps/details?id=com.zilpaymobile',
		platform: 'android',
		count: '100,000+ Downloads',
		action: 'Download App'
	},
	{
		label: 'App Store',
		href: 'https://apps.apple.com/ru/app/zilpay/id1547105860',
		platform: 'ios',
		count: '40,000+ Downloads',
		action: 'Download App'
	},
	{
		label: 'Google Chrome',
		href: 'https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd',
		platform: 'chrome',
		count: '30,000+ Downloads',
		action: 'Install Extension'
	},
	{
		label: 'Mozilla Firefox',
		href: 'https://addons.mozilla.org/en-GB/firefox/addon/zilpay/',
		platform: 'firefox',
		count: '500+ Downloads',
		action: 'Install Add-on'
	},
	{
		label: 'RuStore',
		href: 'https://www.rustore.ru/catalog/app/com.zilpaymobile',
		platform: 'rustore',
		count: '1000+ Downloads',
		action: 'Download'
	},
	{
		label: 'App Gallery',
		href: 'https://appgallery.huawei.com/app/C113872161',
		platform: 'huawei',
		count: '800+ Downloads',
		action: 'Download'
	}
];
