<script lang="ts">
	interface Props {
		title: string;
		body: string;
		icon?: string;
	}

	let { title, body, icon = '' }: Props = $props();
</script>

<article class="card">
	{#if icon}
		<div class="card__icon" aria-hidden="true">{icon}</div>
	{/if}
	<h3 class="card__title">{title}</h3>
	<p class="card__body">{body}</p>
</article>

<style>
	.card {
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		transition: border-color 0.2s;
	}

	.card:hover {
		border-color: var(--color-accent);
	}

	.card__icon {
		font-size: 2rem;
		line-height: 1;
		margin-bottom: 0.25rem;
	}

	.card__title {
		font-size: 1.125rem;
		font-weight: 400;
		color: var(--color-text);
	}

	.card__body {
		font-size: 0.9375rem;
		color: var(--color-text-muted);
		line-height: 1.6;
	}
</style>
