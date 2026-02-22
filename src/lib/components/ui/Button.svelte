<script lang="ts">
	let {
		children,
		href,
		target,
		rel,
		variant = 'primary',
		class: className = '',
		onclick
	} = $props();
</script>

{#if href}
	<a {href} {target} {rel} class="btn btn-{variant} {className}">
		{@render children()}
	</a>
{:else}
	<button {onclick} class="btn btn-{variant} {className}">
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 16px 32px;
		border-radius: 40px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
		color: var(--text-primary);
	}

	.btn-outline {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border-color);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.btn-outline:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--border-hover);
	}

	.btn-secondary {
		background: var(--gray-900);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
	}

	.btn-secondary:hover {
		background: var(--gray-800);
	}
</style>
