<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import Button from '$lib/components/ui/Button.svelte';
	import { join_waitlist, confirm_waitlist } from '$lib/waitlist';
	import { slide } from 'svelte/transition';

	const reduce_motion =
		typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const dur = (ms: number) => (reduce_motion ? 0 : ms);
	let shaking = $state(false);

	let email = $state('');
	let code = $state('');
	let status = $state<
		'idle' | 'mining' | 'sending' | 'awaiting' | 'confirming' | 'done' | 'error'
	>('idle');
	let progress = $state(0);
	let code_error = $state('');
	let submit_error = $state<'server' | 'proton'>('server');

	async function handle_submit(e: SubmitEvent) {
		e.preventDefault();

		if (status === 'mining' || status === 'sending') return;

		status = 'mining';
		progress = 0;

		const result = await join_waitlist(email, (percent) => (progress = percent));

		if (result.ok) {
			status = 'awaiting';
			code = '';
			code_error = '';
		} else {
			submit_error = result.error === 'proton' ? 'proton' : 'server';
			status = 'error';
		}
	}

	async function handle_confirm(e: SubmitEvent) {
		e.preventDefault();

		if (status !== 'awaiting') return;

		const clean = code.trim();

		if (!/^\d{6}$/.test(clean)) return;

		status = 'confirming';
		code_error = '';

		const result = await confirm_waitlist(email, clean);

		if (result.ok) {
			status = 'done';
		} else if (result.error === 'wrong') {
			code_error = 'wrong';
			status = 'awaiting';
			shaking = true;
		} else if (result.error === 'expired' || result.error === 'too_many') {
			code_error = result.error;
			status = 'awaiting';
		} else {
			status = 'error';
		}
	}
</script>

<section id="card" class="card-waitlist">
	<div class="container">
		<div class="card-frame">
			<div class="content">
				<span class="badge">{m.card_badge()}</span>
				<h2>{m.card_title()}</h2>
				<p class="description">{m.card_description()}</p>

				{#if status === 'done'}
					<div class="success" role="status" transition:slide={{ duration: dur(280) }}>
						<svg
							class="success-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="m8 12.5 2.7 2.7L16 9.5" />
						</svg>
						<strong>{m.card_success_title()}</strong>
						<span>{m.card_success_text()}</span>
					</div>
				{:else if status === 'awaiting' || status === 'confirming'}
					<form
						class="confirm-form"
						onsubmit={handle_confirm}
						transition:slide={{ duration: dur(280) }}
					>
						<label for="card-code">{m.card_code_label()}</label>
						<p class="code-hint">{m.card_code_hint({ email })}</p>
						<input
							id="card-code"
							class="code-input"
							class:invalid={code_error !== ''}
							class:shaking
							type="text"
							inputmode="numeric"
							autocomplete="one-time-code"
							maxlength="6"
							bind:value={code}
							oninput={() => (code = code.replace(/\D/g, '').slice(0, 6))}
							onanimationend={() => (shaking = false)}
							placeholder={m.card_code_placeholder()}
						/>
						<Button type="submit">
							{status === 'confirming' ? m.card_confirming() : m.card_confirm_btn()}
						</Button>

						{#if code_error}
							<div class="error" role="alert" transition:slide={{ duration: dur(200) }}>
								<span>
									{code_error === 'wrong'
										? m.card_code_wrong()
										: code_error === 'expired'
											? m.card_code_expired()
											: m.card_code_too_many()}
								</span>
							</div>
						{/if}

						<button type="button" class="link" onclick={() => (status = 'idle')}>
							{m.card_change_email()}
						</button>
					</form>
				{:else}
					<form onsubmit={handle_submit} transition:slide={{ duration: dur(280) }}>
						<label for="card-email">{m.card_email_label()}</label>
						<div class="row">
							<div class="input-wrap">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.8"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<rect x="2.5" y="5" width="19" height="14" rx="2.5" />
									<path d="m3 6.5 9 6.5 9-6.5" />
								</svg>
								<input
									id="card-email"
									type="email"
									bind:value={email}
									placeholder={m.card_email_placeholder()}
									required
								/>
							</div>
							<Button type="submit" disabled={status === 'mining' || status === 'sending'}>
								{#if status === 'mining' || status === 'sending'}
									<span class="spinner" aria-hidden="true"></span>
								{/if}
								{#if status === 'mining'}
									{m.card_verifying()}
								{:else if status === 'sending'}
									{m.card_submitting()}
								{:else if status === 'error'}
									{m.card_retry_btn()}
								{:else}
									{m.card_submit_btn()}
								{/if}
							</Button>
						</div>
						{#if status === 'mining'}
							<div class="progress" transition:slide={{ duration: dur(200) }}>
								<div
									class="progress-track"
									role="progressbar"
									aria-label={m.card_verifying()}
									aria-valuemin={0}
									aria-valuemax={100}
									aria-valuenow={progress}
								>
									<div class="progress-fill" style:width="{progress}%"></div>
								</div>
								<span class="progress-label">{progress}%</span>
							</div>
						{/if}
						<small>{m.card_privacy_note()}</small>

						{#if status === 'error'}
							<div class="error" role="alert" transition:slide={{ duration: dur(200) }}>
								<strong>
									{submit_error === 'proton'
										? m.card_error_proton_title()
										: m.card_error_title()}
								</strong>
								<span>
									{submit_error === 'proton'
										? m.card_error_proton_text()
										: m.card_error_text()}
								</span>
							</div>
						{/if}
					</form>
				{/if}
			</div>

			<div class="visual" aria-hidden="true">
				<div class="glow"></div>
				<img
					class="card-img"
					src="/img/bearby-card.webp"
					alt=""
					width="1536"
					height="1024"
					loading="lazy"
				/>
			</div>
		</div>
	</div>
</section>

<style>
	.card-waitlist {
		padding: 16px 0;
	}

	.card-frame {
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: 48px;
		align-items: center;
		padding: 64px;
		background:
			radial-gradient(ellipse at 85% 20%, rgba(172, 89, 255, 0.1), transparent 55%),
			var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--border-radius-xl);
		overflow: hidden;
	}

	.badge {
		display: inline-block;
		padding: 8px 18px;
		border-radius: 999px;
		background: rgba(172, 89, 255, 0.12);
		border: 1px solid var(--brand-purple);
		color: var(--brand-purple);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h2 {
		margin: 20px 0 10px;
		font-size: clamp(1.8rem, 3.2vw, 2.6rem);
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	.description {
		margin: 0;
		max-width: 400px;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	form {
		margin-top: 32px;
	}

	label {
		display: block;
		margin-bottom: 10px;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.row {
		display: flex;
		gap: 12px;
	}

	.input-wrap {
		position: relative;
		flex: 1;
	}

	.input-wrap svg {
		position: absolute;
		left: 14px;
		top: 50%;
		width: 18px;
		height: 18px;
		transform: translateY(-50%);
		color: var(--text-muted);
		pointer-events: none;
	}

	input {
		width: 100%;
		height: 100%;
		padding: 14px 16px 14px 44px;
		background: var(--bg-subtle);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-md);
		color: var(--text-primary);
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	input::placeholder {
		color: var(--text-muted);
	}

	input:focus {
		outline: none;
		border-color: var(--brand-purple);
		box-shadow: 0 0 0 3px rgba(172, 89, 255, 0.2);
	}

	.row :global(.btn) {
		flex-shrink: 0;
		white-space: nowrap;
	}

	small {
		display: block;
		margin-top: 12px;
		color: var(--text-muted);
	}

	.progress {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 12px;
	}

	.progress-track {
		flex: 1;
		height: 4px;
		border-radius: 999px;
		background: rgba(172, 89, 255, 0.15);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: inherit;
		background: var(--brand-purple);
		transition: width 0.25s ease-out;
	}

	.progress-label {
		min-width: 4ch;
		text-align: right;
		font-size: 0.8rem;
		font-variant-numeric: tabular-nums;
		color: var(--text-muted);
	}

	.spinner {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: #fff;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.success {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-top: 32px;
		padding: 20px;
		background: rgba(172, 89, 255, 0.1);
		border: 1px solid var(--brand-purple);
		border-radius: var(--border-radius-md);
	}

	.success strong {
		color: var(--text-primary);
	}

	.success span {
		color: var(--text-secondary);
	}

	.success-icon {
		width: 28px;
		height: 28px;
		color: var(--brand-purple);
	}

	.error {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-top: 16px;
		padding: 16px 20px;
		background: rgba(224, 92, 92, 0.1);
		border: 1px solid #e05c5c;
		border-radius: var(--border-radius-md);
	}

	.error strong {
		color: var(--text-primary);
	}

	.error span {
		color: var(--text-secondary);
	}

	.confirm-form {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 32px;
	}

	.code-hint {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.code-input {
		text-align: center;
		font-size: 1.6rem;
		letter-spacing: 0.5em;
		font-variant-numeric: tabular-nums;
		padding: 14px 16px;
	}

	.code-input.invalid {
		border-color: #e05c5c;
	}

	.code-input.shaking {
		animation: shake 0.4s ease;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		20% {
			transform: translateX(-6px);
		}
		40% {
			transform: translateX(6px);
		}
		60% {
			transform: translateX(-4px);
		}
		80% {
			transform: translateX(4px);
		}
	}

	.confirm-form :global(.btn) {
		width: 100%;
		margin-top: 4px;
	}

	.link {
		margin-top: 8px;
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		font-size: 0.9rem;
		color: var(--brand-purple);
		text-decoration: underline;
		cursor: pointer;
	}

	/* ---- visual stage ---- */

	.visual {
		position: relative;
		display: flex;
		justify-content: center;
		padding: 16px 0;
	}

	.glow {
		position: absolute;
		inset: 12% 8%;
		background: radial-gradient(
			closest-side,
			rgba(172, 89, 255, 0.32),
			rgba(172, 89, 255, 0.08) 60%,
			transparent 80%
		);
		filter: blur(24px);
	}

	.card-img {
		position: relative;
		width: 100%;
		max-width: 460px;
		height: auto;
		transform: rotate(-4deg);
		filter: drop-shadow(0 28px 48px rgba(0, 0, 0, 0.45))
			drop-shadow(0 0 32px rgba(172, 89, 255, 0.28));
		animation: card-float 6s ease-in-out infinite;
	}

	@keyframes card-float {
		0%,
		100% {
			transform: rotate(-4deg) translateY(0);
		}
		50% {
			transform: rotate(-4deg) translateY(-12px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card-img {
			animation: none;
		}

		.code-input.shaking {
			animation: none;
		}
	}

	@media (max-width: 900px) {
		.card-frame {
			grid-template-columns: 1fr;
			gap: 32px;
			padding: 40px 28px;
		}

		.visual {
			order: -1;
		}

		.card-img {
			max-width: 380px;
		}
	}

	@media (max-width: 560px) {
		.row {
			flex-direction: column;
		}

		.row :global(.btn) {
			width: 100%;
		}

		.card-img {
			max-width: 300px;
		}
	}
</style>
