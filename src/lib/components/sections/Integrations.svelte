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
					<span class="integrations__dot" style="background:{chain.color}" aria-hidden="true"
					></span>
					<span class="integrations__name">{chain.name}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.integrations {
		padding: 100px 20px;
		background: #000;
	}

	.integrations__inner {
		max-width: 1140px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: start;
	}

	@media (max-width: 700px) {
		.integrations__inner {
			grid-template-columns: 1fr;
		}
	}

	.integrations__text {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.integrations__title {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--color-text);
		line-height: 1.2;
		margin: 0;
	}

	.integrations__body {
		font-size: 0.9375rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		margin: 0;
	}

	.integrations__list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		margin: 0;
		padding: 0;
	}

	.integrations__item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		background: rgba(250, 250, 250, 0.05);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 12px;
		border: 1px solid rgba(230, 230, 230, 0.1);
		transition: border-color 0.2s;
	}

	.integrations__item:hover {
		border-color: rgba(172, 89, 255, 0.5);
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
