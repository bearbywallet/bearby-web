<script lang="ts">
	import { downloads } from '$lib/data/downloads';

	const platformIcons: Record<string, string> = {
		android: '▶',
		ios: '',
		chrome: '◉',
		firefox: '🦊',
		rustore: '◈',
		huawei: '⬡'
	};
</script>

<section id="downloads" class="downloads">
	<div class="downloads__inner">
		<div class="downloads__grid">
			{#each downloads as dl (dl.platform)}
				<a
					href={dl.href}
					class="downloads__card"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Download Bearby — {dl.label}"
				>
					<div class="downloads__icon-wrap" data-platform={dl.platform} aria-hidden="true">
						<span class="downloads__icon-symbol">{platformIcons[dl.platform] ?? '↓'}</span>
					</div>
					<div class="downloads__meta">
						<span class="downloads__platform">{dl.label}</span>
						<span class="downloads__count">{dl.count}</span>
					</div>
					<button class="downloads__btn" tabindex="-1" aria-hidden="true">{dl.action}</button>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.downloads {
		padding: var(--space-xl) var(--space-md) var(--space-2xl);
		border-top: 1px solid var(--color-border);
	}

	.downloads__inner {
		max-width: var(--breakpoint-desktop);
		margin: 0 auto;
	}

	.downloads__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-sm);
	}

	@media (max-width: 800px) {
		.downloads__grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.downloads__grid {
			grid-template-columns: 1fr;
		}
	}

	.downloads__card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		text-decoration: none;
		transition: border-color 0.2s, background 0.2s;
		cursor: pointer;
	}

	.downloads__card:hover {
		border-color: var(--color-accent-purple);
		background: var(--color-surface-2);
	}

	/* Platform icon */
	.downloads__icon-wrap {
		width: 52px;
		height: 52px;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
	}

	[data-platform='android'] .downloads__icon-symbol { color: #78c257; }
	[data-platform='ios'] .downloads__icon-symbol { color: #aaa; }
	[data-platform='chrome'] .downloads__icon-symbol { color: #4285f4; }
	[data-platform='firefox'] .downloads__icon-symbol { color: #ff7139; }
	[data-platform='rustore'] .downloads__icon-symbol { color: #8b80f9; }
	[data-platform='huawei'] .downloads__icon-symbol { color: #cf0a2c; }

	.downloads__icon-symbol {
		line-height: 1;
	}

	.downloads__meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}

	.downloads__platform {
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-text);
	}

	.downloads__count {
		font-size: 0.8125rem;
		color: var(--color-text-muted);
	}

	.downloads__btn {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		color: var(--color-text);
		font-size: 0.8125rem;
		cursor: pointer;
		align-self: flex-start;
		transition: border-color 0.2s;
		pointer-events: none;
	}

	.downloads__card:hover .downloads__btn {
		border-color: var(--color-accent-purple);
		color: var(--color-accent-purple);
	}
</style>
