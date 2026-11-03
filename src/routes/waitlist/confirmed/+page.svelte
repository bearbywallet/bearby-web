<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import { getLocale } from '$lib/paraglide/runtime';
	import { check_waitlist, complete_waitlist } from '$lib/waitlist';
	import { country_options } from '$lib/countries';
	import Button from '$lib/components/ui/Button.svelte';

	const options = country_options(getLocale());

	let email = $state('');
	let code = $state('');
	let country = $state('');
	let country_error = $state(false);
	let submitting = $state(false);
	/** Whole minutes left before the link expires, when the backend told us. */
	let expires_min = $state<number | null>(null);
	let phase = $state<'form' | 'done' | 'used' | 'invalid' | 'expired' | 'too_many' | 'error'>(
		'form'
	);

	$effect(() => {
		email = page.url.searchParams.get('email') ?? '';
		code = page.url.searchParams.get('code') ?? '';
		if (!email || !code) {
			phase = 'invalid';
			return;
		}

		// Preflight: probe the link on page load so already-used, expired and
		// tampered links land on their dedicated screens immediately. The
		// probe never consumes the code, and network/server hiccups fail open:
		// the form's submit will surface the precise server error instead.
		check_waitlist(email, code).then(({ status, expires_in }) => {
			if (status === 'valid') {
				if (expires_in && expires_in > 0) {
					expires_min = Math.max(1, Math.ceil(expires_in / 60));
				}
				return;
			}
			if (status === 'invalid' || status === 'wrong') phase = 'invalid';
			else if (status === 'used') phase = 'used';
			else if (status === 'expired') phase = 'expired';
		});
	});

	// Confirmation links are one-shot: strip the reusable secret (email+code)
	// from the address bar after a successful confirm so it cannot be reused
	// or forwarded.

	async function handle_confirm(e: SubmitEvent) {
		e.preventDefault();

		if (submitting) return;

		// Country of residence is required to qualify.
		if (!country) {
			country_error = true;
			return;
		}

		submitting = true;

		const result = await complete_waitlist(email, code, country);

		if (result.ok) {
			phase = 'done';
			history.replaceState(history.state, '', page.url.pathname);
		} else if (result.error === 'used') {
			phase = 'used';
		} else if (result.error === 'expired') {
			phase = 'expired';
		} else if (result.error === 'invalid' || result.error === 'wrong') {
			// 'wrong' here means the emailed code no longer matches the stored
			// one (a newer code was issued) — same UX as a broken link.
			phase = 'invalid';
		} else if (result.error === 'too_many') {
			phase = 'too_many';
		} else {
			phase = 'error';
		}

		submitting = false;
	}
</script>

<svelte:head>
	<title>{m.confirmed_page_title()}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<article class="confirmed">
	<div class="confirmed__card" role="status">
		{#if phase === 'form'}
			<form class="confirmed__form" onsubmit={handle_confirm}>
				<h1>{m.confirmed_form_title()}</h1>
				<p class="confirmed__hint">{m.confirmed_form_hint({ email })}</p>
				{#if expires_min !== null}
					<p class="confirmed__hint">{m.confirmed_expires_hint({ minutes: expires_min })}</p>
				{/if}

				<label for="confirmed-country">{m.card_country_label()}</label>
				<p class="confirmed__hint">{m.card_country_hint()}</p>
				<div class="confirmed__select-wrap">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
					<select
						id="confirmed-country"
						class:invalid={country_error}
						bind:value={country}
						onchange={() => (country_error = false)}
					>
						<option value="" disabled>{m.card_country_placeholder()}</option>
						{#each options as option (option.code)}
							<option value={option.code}>{option.name}</option>
						{/each}
					</select>
				</div>
				{#if country_error}
					<p class="confirmed__required" role="alert">{m.card_country_required()}</p>
				{/if}

				<Button type="submit" disabled={submitting}>
					{submitting ? m.card_confirming() : m.confirmed_confirm_btn()}
				</Button>
			</form>
		{:else if phase === 'done'}
			<div class="confirmed__icon confirmed__icon--ok" aria-hidden="true">
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
			<h1>{m.card_success_title()}</h1>
			<p>{m.confirmed_success_text()}</p>
		{:else if phase === 'invalid'}
			<div class="confirmed__icon confirmed__icon--err" aria-hidden="true">
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
			<h1>{m.confirmed_invalid_title()}</h1>
			<p>{m.confirmed_invalid_text()}</p>
		{:else if phase === 'expired'}
			<div class="confirmed__icon confirmed__icon--err" aria-hidden="true">
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
			<h1>{m.confirmed_expired_title()}</h1>
			<p>{m.confirmed_expired_text()}</p>
		{:else if phase === 'used'}
			<div class="confirmed__icon confirmed__icon--err" aria-hidden="true">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="m8 12.5 2.7 2.7L16 9.5" />
				</svg>
			</div>
			<h1>{m.confirmed_used_title()}</h1>
			<p>{m.confirmed_used_text()}</p>
		{:else if phase === 'too_many'}
			<div class="confirmed__icon confirmed__icon--err" aria-hidden="true">
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
			<h1>{m.confirmed_too_many_title()}</h1>
			<p>{m.confirmed_too_many_text()}</p>
		{:else}
			<div class="confirmed__icon confirmed__icon--err" aria-hidden="true">
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
			<h1>{m.confirmed_server_title()}</h1>
			<p>{m.confirmed_server_text()}</p>
		{/if}
	</div>
</article>

<style>
	.confirmed {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 320px);
		padding: 120px 24px 80px;
	}

	.confirmed__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 460px;
		width: 100%;
		padding: 48px 32px;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-lg);
	}

	.confirmed__card h1 {
		font-size: 1.5rem;
		margin: 0 0 12px;
	}

	.confirmed__card p {
		margin: 0;
		color: var(--text-secondary);
	}

	.confirmed__icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.confirmed__icon svg {
		width: 28px;
		height: 28px;
	}

	.confirmed__icon--ok {
		color: #4ade80;
		background: rgba(74, 222, 128, 0.12);
	}

	.confirmed__icon--err {
		color: #e05c5c;
		background: rgba(224, 92, 92, 0.12);
	}

	.confirmed__form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		text-align: left;
		width: 100%;
		gap: 8px;
	}

	.confirmed__form h1 {
		text-align: center;
	}

	.confirmed__hint {
		font-size: 0.9rem;
		color: var(--text-secondary);
		overflow-wrap: anywhere;
	}

	.confirmed__form label {
		margin-top: 16px;
	}

	.confirmed__select-wrap {
		position: relative;
	}

	.confirmed__select-wrap svg {
		position: absolute;
		right: 14px;
		top: 50%;
		width: 18px;
		height: 18px;
		transform: translateY(-50%);
		color: var(--text-muted);
		pointer-events: none;
	}

	.confirmed__form select {
		appearance: none;
		width: 100%;
		padding: 14px 44px 14px 16px;
		background: var(--bg-subtle);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		color: var(--text-primary);
		font-size: 1rem;
		font-family: inherit;
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.confirmed__form select option[value=''] {
		color: var(--text-muted);
	}

	.confirmed__form select:focus {
		outline: none;
		border-color: var(--brand-purple);
		box-shadow: 0 0 0 3px rgba(172, 89, 255, 0.2);
	}

	.confirmed__form select.invalid {
		border-color: #e05c5c;
	}

	.confirmed__required {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.confirmed__form :global(.btn) {
		width: 100%;
		margin-top: 16px;
	}
</style>
