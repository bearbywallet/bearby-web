<script lang="ts">
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';
</script>

<button
	class="locale-toggle"
	onclick={() => {
		const current = getLocale();
		const next = locales.find((l) => l !== current) ?? locales[0];
		setLocale(next);
	}}
	aria-label="Switch language"
>
	{getLocale().toUpperCase()}
</button>

<style>
	.locale-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--bg-subtle);
		border: 1px solid var(--border-color);
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.75rem;
		font-weight: 600;
		font-family: var(--font-primary);
	}

	.locale-toggle:hover {
		background: var(--bg-card-hover);
		border-color: var(--border-hover);
	}
</style>
