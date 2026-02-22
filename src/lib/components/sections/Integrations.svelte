<script lang="ts">
	import { chains } from '$lib/data/integrations';
</script>

<section class="integrations" id="integrations">
	<div class="integrations__inner">
		<div class="integrations__text">
			<h2 class="integrations__title">Seamless Integrations for a Smarter Workflow</h2>
			<p class="integrations__body">
				Bearby works effortlessly with your favorite tools, making your workflow smoother and more
				efficient. Connect, automate, and get things done faster!
			</p>
		</div>

		<ul class="integrations__list" role="list">
			{#each chains as chain (chain.name)}
				<li class="integrations__item">
					<span class="integrations__dot" style="background:{chain.color}" aria-hidden="true"></span>
					<span class="integrations__name">{chain.name}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.integrations {
		padding: var(--space-2xl) var(--space-md);
		border-top: 1px solid var(--color-border);
	}

	.integrations__inner {
		max-width: var(--breakpoint-desktop);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xl);
		align-items: start;
	}

	@media (max-width: 700px) {
		.integrations__inner {
			grid-template-columns: 1fr;
		}
	}

	.integrations__title {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		letter-spacing: -0.02em;
		color: var(--color-text);
		line-height: 1.2;
		margin-bottom: var(--space-sm);
	}

	.integrations__body {
		font-size: 0.9375rem;
		color: var(--color-text-muted);
		line-height: 1.7;
	}

	.integrations__list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xs);
	}

	.integrations__item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 0.875rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: border-color 0.2s;
	}

	.integrations__item:hover {
		border-color: var(--color-accent-purple);
	}

	.integrations__dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.integrations__name {
		font-size: 0.9rem;
		color: var(--color-text);
	}
</style>
