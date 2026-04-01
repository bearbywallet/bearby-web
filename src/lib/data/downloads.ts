import * as m from '$lib/paraglide/messages';

export type Download = {
	label: string;
	href: string;
	platform: string;
	count: string;
	action: string;
	secondary?: boolean;
	disabled?: boolean;
};

export function getDownloads(): Download[] {
	return [
		{
			label: m.dl_google_play(),
			href: 'https://play.google.com/store/apps/details?id=com.zilpaymobile',
			platform: 'android',
			count: m.dl_count_100k(),
			action: m.dl_action_app()
		},
		{
			label: m.dl_app_store(),
			href: 'https://apps.apple.com/ru/app/zilpay/id1547105860',
			platform: 'ios',
			count: m.dl_count_40k(),
			action: m.dl_action_app()
		},
		{
			label: m.dl_chrome(),
			href: 'https://chrome.google.com/webstore/detail/zilpay/klnaejjgbibmhlephnhpmaofohgkpgkd',
			platform: 'chrome',
			count: m.dl_count_30k(),
			action: m.dl_action_extension()
		},
		{
			label: m.dl_firefox(),
			href: 'https://addons.mozilla.org/en-GB/firefox/addon/bearby/',
			platform: 'firefox',
			count: m.dl_count_500(),
			action: m.dl_action_addon()
		},
		{
			label: m.dl_rustore(),
			href: 'https://www.rustore.ru/catalog/app/com.zilpaymobile',
			platform: 'rustore',
			count: m.dl_count_1000(),
			action: m.dl_action_download()
		},
		{
			label: m.dl_app_gallery(),
			href: 'https://appgallery.huawei.com/app/C113872161',
			platform: 'huawei',
			count: m.dl_count_800(),
			action: m.dl_action_download()
		},
		{
			label: m.dl_android_apk(),
			href: 'https://github.com/bearbywallet/zilpay-mobile/releases/latest/download/app-release.apk',
			platform: 'apk',
			count: m.dl_count_direct(),
			action: m.dl_action_apk(),
			secondary: true
		},
		{
			label: m.dl_windows(),
			href: '#',
			platform: 'windows',
			count: m.dl_count_desktop(),
			action: m.dl_action_download(),
			secondary: true,
			disabled: true
		},
		{
			label: m.dl_macos(),
			href: '#',
			platform: 'macos',
			count: m.dl_count_desktop(),
			action: m.dl_action_download(),
			secondary: true,
			disabled: true
		},
		{
			label: m.dl_linux(),
			href: '#',
			platform: 'linux',
			count: m.dl_count_desktop(),
			action: m.dl_action_download(),
			secondary: true,
			disabled: true
		},
		{
			label: m.dl_old_chrome(),
			href: 'https://chromewebstore.google.com/detail/bearby/papngmkmknnmfhabbckobgfpihpdgplk',
			platform: 'old-chrome',
			count: m.dl_count_legacy_ext(),
			action: m.dl_action_install(),
			secondary: true
		},
		{
			label: m.dl_old_firefox(),
			href: 'https://addons.mozilla.org/en-GB/firefox/addon/bearby/',
			platform: 'old-firefox',
			count: m.dl_count_legacy_addon(),
			action: m.dl_action_install(),
			secondary: true
		}
	];
}
