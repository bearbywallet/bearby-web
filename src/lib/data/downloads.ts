export type Download = {
	label: string;
	href: string;
	platform: string;
	count: string;
	action: string;
	icon: string;
};

export const downloads: Download[] = [
	{
		label: 'Google Playstore',
		href: 'https://play.google.com',
		platform: 'android',
		count: '150,000+ Downloads',
		action: 'Download App',
		icon: 'play'
	},
	{
		label: 'App Store',
		href: 'https://apps.apple.com',
		platform: 'ios',
		count: '40,000+ Downloads',
		action: 'Download App',
		icon: 'apple'
	},
	{
		label: 'Google Chrome',
		href: 'https://chrome.google.com/webstore',
		platform: 'chrome',
		count: '30,000+ Downloads',
		action: 'Install Extension',
		icon: 'chrome'
	},
	{
		label: 'Mozilla Firefox',
		href: 'https://addons.mozilla.org',
		platform: 'firefox',
		count: '500+ Downloads',
		action: 'Install Add-on',
		icon: 'firefox'
	},
	{
		label: 'RuStore',
		href: 'https://rustore.ru',
		platform: 'rustore',
		count: '1000+ Downloads',
		action: 'Download',
		icon: 'rustore'
	},
	{
		label: 'App Gallery',
		href: 'https://appgallery.huawei.com',
		platform: 'huawei',
		count: '800+ Downloads',
		action: 'Download',
		icon: 'huawei'
	}
];
