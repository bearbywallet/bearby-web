export type Download = {
	label: string;
	href: string;
	platform: string;
	count: string;
	action: string;
	secondary?: boolean;
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
	},
	{
		label: 'Android APK',
		href: '#',
		platform: 'apk',
		count: 'Direct Download',
		action: 'Download APK',
		secondary: true
	},
	{
		label: 'Windows',
		href: '#',
		platform: 'windows',
		count: 'Desktop App',
		action: 'Download',
		secondary: true
	},
	{
		label: 'macOS',
		href: '#',
		platform: 'macos',
		count: 'Desktop App',
		action: 'Download',
		secondary: true
	},
	{
		label: 'Linux',
		href: '#',
		platform: 'linux',
		count: 'Desktop App',
		action: 'Download',
		secondary: true
	},
	{
		label: 'Old Bearby (Chrome)',
		href: '#',
		platform: 'old-chrome',
		count: 'Legacy Extension',
		action: 'Install',
		secondary: true
	},
	{
		label: 'Old Bearby (Firefox)',
		href: '#',
		platform: 'old-firefox',
		count: 'Legacy Add-on',
		action: 'Install',
		secondary: true
	}
];
