<script lang="ts">
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';

	let open = $state(false);

	const localeLabels: Record<string, string> = {
		en: 'English',
		ru: 'Русский'
	};

	function select(locale: string) {
		open = false;
		if (locale !== getLocale()) {
			setLocale(locale as any);
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.locale-fab')) {
			open = false;
		}
	}
</script>

<svelte:document onclick={handleClickOutside} />

<div class="locale-fab">
	{#if open}
		<ul class="locale-list">
			{#each locales as locale (locale)}
				<li>
					<button
						class="locale-option"
						class:active={locale === getLocale()}
						onclick={() => select(locale)}
					>
						{localeLabels[locale] ?? locale}
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<button
		class="locale-toggle"
		onclick={() => (open = !open)}
		aria-label="Switch language"
		aria-expanded={open}
	>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="10"></circle>
			<line x1="2" y1="12" x2="22" y2="12"></line>
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
		</svg>
		<span class="locale-label">{getLocale().toUpperCase()}</span>
	</button>
</div>

<style>
	.locale-fab {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 200;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 8px;
	}

	.locale-toggle {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 16px;
		border-radius: 40px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.8rem;
		font-weight: 600;
		font-family: var(--font-primary);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	:global([data-theme='light']) .locale-toggle {
		background: rgba(255, 255, 255, 0.45);
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	.locale-toggle:hover {
		background: rgba(255, 255, 255, 0.18);
		border-color: rgba(255, 255, 255, 0.3);
	}

	:global([data-theme='light']) .locale-toggle:hover {
		background: rgba(255, 255, 255, 0.6);
		border-color: rgba(255, 255, 255, 0.8);
	}

	.locale-label {
		letter-spacing: 0.05em;
	}

	.locale-list {
		list-style: none;
		margin: 0;
		padding: 6px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
		animation: fade-in 0.15s ease-out;
	}

	:global([data-theme='light']) .locale-list {
		background: rgba(255, 255, 255, 0.45);
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	.locale-option {
		display: block;
		width: 100%;
		padding: 8px 16px;
		border: none;
		border-radius: 10px;
		background: transparent;
		color: var(--text-secondary);
		font-size: 0.85rem;
		font-family: var(--font-primary);
		cursor: pointer;
		text-align: left;
		transition: all 0.15s;
		white-space: nowrap;
	}

	.locale-option:hover {
		background: var(--bg-subtle);
		color: var(--text-primary);
	}

	.locale-option.active {
		color: var(--text-primary);
		font-weight: 600;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
