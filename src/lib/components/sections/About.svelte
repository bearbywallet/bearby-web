<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	let activeTab = $state(0);

	const tabs = [
		{ label: m.about_tab_language(), image: '/img/phone-dapps.webp' },
		{ label: m.about_tab_bitcoin(), image: '/img/bitoin-support.webp' },
		{ label: m.about_tab_dapps(), image: '/img/browser.webp' }
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
						<img src={tab.image} alt={tab.label} loading="lazy" />
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
	}

	.tab-btn {
		width: 100%;
		padding: 30px 50px;
		border-radius: 50px;
		background-color: transparent;
		border: 1px solid var(--border-card);
		box-shadow: none;
		color: var(--text-secondary);
		font-family: var(--font-secondary);
		font-size: 20px;
		font-weight: 400;
		text-align: left;
		cursor: pointer;
		transition:
			color 0.2s,
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.tab-btn.active {
		border-color: var(--border-hover);
		box-shadow: var(--shadow-glow) 0px 0px 30px 0px inset;
		color: var(--text-primary);
	}

	.tab-btn:hover:not(.active) {
		border-color: var(--border-card);
		color: var(--text-primary);
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
			padding: 30px;
			min-height: 300px;
		}

		.tab-btn {
			padding: 20px 30px;
			font-size: 17px;
		}
	}
</style>
