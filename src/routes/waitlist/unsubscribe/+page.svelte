<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { unsubscribe_by_token } from '$lib/waitlist';

	let state = $state<'working' | 'done' | 'invalid'>('working');

	onMount(async () => {
		const token = page.url.searchParams.get('token') ?? '';
		state = (await unsubscribe_by_token(token)) ? 'done' : 'invalid';
	});
</script>

<svelte:head>
	<title>{m.unsub_page_title()}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<article class="unsub">
	<div class="unsub__card" role="status">
		{#if state === 'working'}
			<span class="unsub__spinner" aria-hidden="true"></span>
			<h1>{m.unsub_working_title()}</h1>
			<p>{m.unsub_working_text()}</p>
		{:else if state === 'done'}
			<div class="unsub__icon unsub__icon--ok" aria-hidden="true">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="m8 12.5 2.7 2.7L16 9.5" />
				</svg>
			</div>
			<h1>{m.unsub_done_title()}</h1>
			<p>{m.unsub_done_text()}</p>
		{:else}
			<div class="unsub__icon unsub__icon--err" aria-hidden="true">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M12 8v4" />
					<path d="M12 16h.01" />
				</svg>
			</div>
			<h1>{m.unsub_invalid_title()}</h1>
			<p>{m.unsub_invalid_text()}</p>
		{/if}
	</div>
</article>

<style>
	.unsub {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 320px);
		padding: 120px 24px 80px;
	}

	.unsub__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		max-width: 440px;
		padding: 48px 40px;
		text-align: center;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.02) 100%
		);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--border-radius-xl);
		backdrop-filter: blur(30px);
		-webkit-backdrop-filter: blur(30px);
	}

	.unsub__icon {
		width: 56px;
		height: 56px;
		padding: 14px;
		margin-bottom: 12px;
		border-radius: 50%;
	}

	.unsub__icon svg {
		width: 100%;
		height: 100%;
	}

	.unsub__icon--ok {
		color: var(--brand-purple);
		background: rgba(172, 89, 255, 0.12);
	}

	.unsub__icon--err {
		color: #e05c5c;
		background: rgba(224, 92, 92, 0.12);
	}

	h1 {
		font-size: clamp(1.4rem, 3vw, 1.8rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	p {
		margin: 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.unsub__spinner {
		width: 32px;
		height: 32px;
		margin-bottom: 12px;
		border-radius: 50%;
		border: 3px solid rgba(172, 89, 255, 0.2);
		border-top-color: var(--brand-purple);
		animation: unsub-spin 0.7s linear infinite;
	}

	@keyframes unsub-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.unsub__spinner {
			animation: none;
		}
	}
</style>
