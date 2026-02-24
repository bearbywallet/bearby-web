<script lang="ts">
	let { children, class: className = '' } = $props();
</script>

<div class="card {className}">
	{@render children()}
</div>

<style>
	.card {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-lg);
		padding: 32px;
		transition:
			background 0.2s,
			border-color 0.2s;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.card:hover {
		background: var(--bg-card-hover);
		border-color: var(--border-hover);
	}
</style>
