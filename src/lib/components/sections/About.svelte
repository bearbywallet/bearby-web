<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let activeTab = $state(0);

	const tabs = [
		{ label: m.about_tab_language(), image: '/img/phone-dapps.webp', w: 1024, h: 557 },
		{ label: m.about_tab_bitcoin(), image: '/img/bitoin-support.webp', w: 2048, h: 1113 },
		{ label: m.about_tab_dapps(), image: '/img/browser.webp', w: 2095, h: 1139 }
	];
</script>

<section id="about">
	<div class="container">
		<div class="productivity-card">
			<div class="tabs-col">
				{#each tabs as tab, i (tab.label)}
					<button class="tab-btn" class:active={activeTab === i} onclick={() => (activeTab = i)}>
						{tab.label}
					</button>
				{/each}
			</div>

			<div class="image-col">
				{#each tabs as tab, i (tab.label)}
					<div class="image-wrapper" class:visible={activeTab === i}>
						<img src={tab.image} alt={tab.label} loading="lazy" width={tab.w} height={tab.h} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		padding: 0;
	}

	.productivity-card {
		display: flex;
		flex-direction: row;
		gap: 10px;
		align-items: stretch;
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		padding: 50px;
		min-height: 380px;
	}

	.tabs-col {
		flex: 1 0 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		overflow: hidden;
		padding: 16px;
		border-radius: calc(var(--card-radius) - 20px);
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(24px) saturate(180%);
		-webkit-backdrop-filter: blur(24px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.06),
			inset 0 -1px 0 rgba(255, 255, 255, 0.02),
			0 2px 12px rgba(0, 0, 0, 0.08);
	}

	:global([data-theme='light']) .tabs-col {
		background: rgba(255, 255, 255, 0.25);
		border: 1px solid rgba(255, 255, 255, 0.45);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.4),
			inset 0 -1px 0 rgba(255, 255, 255, 0.1),
			0 2px 12px rgba(0, 0, 0, 0.04);
	}

	.tab-btn {
		width: 100%;
		padding: 30px 50px;
		border-radius: 50px;
		background: rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(16px) saturate(180%);
		-webkit-backdrop-filter: blur(16px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
		color: var(--text-secondary);
		font-family: var(--font-secondary);
		font-size: 20px;
		font-weight: 400;
		text-align: left;
		cursor: pointer;
		transition:
			color 0.2s,
			border-color 0.2s,
			box-shadow 0.2s,
			background 0.2s;
	}

	:global([data-theme='light']) .tab-btn {
		background: rgba(255, 255, 255, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.5);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
	}

	.tab-btn.active {
		border-color: rgba(255, 255, 255, 0.25);
		box-shadow:
			var(--shadow-glow) 0px 0px 30px 0px inset,
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.1);
		color: var(--text-primary);
	}

	:global([data-theme='light']) .tab-btn.active {
		background: rgba(255, 255, 255, 0.55);
		border-color: rgba(255, 255, 255, 0.7);
		box-shadow:
			var(--shadow-glow) 0px 0px 30px 0px inset,
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	.tab-btn:hover:not(.active) {
		border-color: rgba(255, 255, 255, 0.18);
		background: rgba(255, 255, 255, 0.08);
		color: var(--text-primary);
	}

	:global([data-theme='light']) .tab-btn:hover:not(.active) {
		background: rgba(255, 255, 255, 0.45);
		border-color: rgba(255, 255, 255, 0.6);
	}

	.image-col {
		flex: 1 0 0;
		position: relative;
		overflow: hidden;
		border-radius: calc(var(--card-radius) - 20px);
	}

	.image-wrapper {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.35s ease;
		-webkit-mask: linear-gradient(rgb(0, 0, 0) 58%, rgba(0, 0, 0, 0) 100%);
		mask: linear-gradient(rgb(0, 0, 0) 58%, rgba(0, 0, 0, 0) 100%);
	}

	.image-wrapper.visible {
		opacity: 1;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		border-radius: calc(var(--card-radius) - 20px);
	}

	@media (max-width: 768px) {
		.productivity-card {
			flex-direction: column;
			padding: 12px;
			min-height: auto;
			border-radius: 24px;
			gap: 8px;
		}

		.tabs-col {
			flex: 0 0 auto;
			gap: 6px;
			overflow: visible;
		}

		.image-col {
			flex: 0 0 auto;
			height: 300px;
			border-radius: 16px;
		}

		.image-wrapper img {
			border-radius: 16px;
		}

		.tab-btn {
			padding: 12px 18px;
			font-size: 14px;
			border-radius: 28px;
			text-align: center;
		}
	}
</style>
