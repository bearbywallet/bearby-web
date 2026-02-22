<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'ghost' | 'outline';
		href?: string;
		onclick?: () => void;
		children: Snippet;
		target?: string;
		rel?: string;
		class?: string;
	}

	let {
		variant = 'primary',
		href,
		onclick,
		children,
		target,
		rel,
		class: className = ''
	}: Props = $props();
</script>

{#if href}
	<a {href} {target} {rel} class="btn btn--{variant} {className}">
		{@render children()}
	</a>
{:else}
	<button {onclick} class="btn btn--{variant} {className}">
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-md);
		font-family: var(--font-body);
		font-weight: 500;
		font-size: 0.9375rem;
		cursor: pointer;
		border: 2px solid transparent;
		transition:
			background-color 0.2s,
			color 0.2s,
			border-color 0.2s,
			opacity 0.2s;
		white-space: nowrap;
	}

	.btn:hover {
		opacity: 0.88;
	}

	.btn--primary {
		background-color: var(--color-accent);
		color: #fff;
		border-color: var(--color-accent);
	}

	.btn--ghost {
		background-color: transparent;
		color: var(--color-accent);
		border-color: transparent;
	}

	.btn--outline {
		background-color: transparent;
		color: var(--color-text);
		border-color: var(--color-border);
	}

	.btn--outline:hover {
		border-color: var(--color-text-muted);
		opacity: 1;
	}
</style>
