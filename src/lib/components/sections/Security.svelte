<script lang="ts">
	import { cryptoPrimitives } from '$lib/data/security';
</script>

<section id="secure" class="security-section">
	<div class="container">
		<div class="hero-card">
			<div class="hero-content">
				<span class="badge">Quantum Resistant</span>
				<h2 class="hero-title">Built for the post-quantum era</h2>
				<p class="hero-desc">
					Every layer of Bearby's architecture is hardened with military-grade cryptography —
					designed to withstand threats that don't even exist yet.
				</p>
			</div>
			<div class="shield-visual">
				<div class="shield-glow"></div>
				<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#shield-grad)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<defs>
						<linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stop-color="#ac59ff" />
							<stop offset="100%" stop-color="#e80570" />
						</linearGradient>
					</defs>
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					<path d="m9 12 2 2 4-4" />
				</svg>
			</div>
		</div>

		<div class="grid-row">
			<div class="rust-card">
				<div class="rust-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32" aria-label="Rust"><path fill="currentColor" d="m31.584 15.615l-1.329-.823a6.54 6.54 0 0 0-.036-.385l1.141-1.063a.463.463 0 0 0-.152-.765l-1.459-.543a8.832 8.832 0 0 0-.113-.38l.905-1.26a.454.454 0 0 0-.296-.719l-1.537-.251c-.057-.115-.12-.229-.181-.344l.645-1.416a.45.45 0 0 0-.036-.443a.464.464 0 0 0-.396-.203l-1.563.057a6.608 6.608 0 0 0-.245-.303l.36-1.516a.46.46 0 0 0-.552-.552l-1.516.36a5.584 5.584 0 0 0-.303-.245l.057-1.563a.455.455 0 0 0-.645-.432l-1.416.645c-.115-.061-.229-.124-.349-.181l-.251-1.537a.458.458 0 0 0-.719-.296l-1.26.905c-.125-.041-.251-.077-.375-.113L19.415.796a.458.458 0 0 0-.76-.157l-1.063 1.147a7.186 7.186 0 0 0-.391-.041L16.384.421a.454.454 0 0 0-.776 0l-.823 1.324c-.131.009-.26.025-.385.041L13.337.639a.46.46 0 0 0-.765.157l-.543 1.453c-.129.036-.249.077-.38.113l-1.26-.905a.458.458 0 0 0-.719.296L9.419 3.29c-.115.057-.228.12-.343.181l-1.417-.645a.455.455 0 0 0-.645.432l.052 1.563c-.099.079-.199.161-.297.245l-1.52-.36a.458.458 0 0 0-.548.552l.355 1.516c-.084.099-.161.197-.245.303L3.254 7.02a.456.456 0 0 0-.432.645l.647 1.416l-.188.344l-1.536.251a.46.46 0 0 0-.297.719l.912 1.26a8.585 8.585 0 0 0-.115.38l-1.459.543a.46.46 0 0 0-.151.765l1.14 1.063a6.621 6.621 0 0 0-.036.385l-1.328.823a.449.449 0 0 0 0 .771l1.328.823c.009.131.02.261.036.385l-1.14 1.068a.454.454 0 0 0 .151.76l1.459.548c.036.124.072.249.115.375l-.912 1.26a.458.458 0 0 0 .301.719l1.537.251c.057.115.12.229.183.344l-.647 1.416a.456.456 0 0 0 .432.645l1.557-.052c.084.1.161.199.251.297l-.36 1.521a.456.456 0 0 0 .548.547l1.52-.355c.099.084.199.161.303.245l-.057 1.557a.453.453 0 0 0 .645.432l1.417-.645c.115.061.228.124.343.187l.256 1.537a.455.455 0 0 0 .713.296l1.265-.911c.125.041.251.077.375.113l.548 1.459a.452.452 0 0 0 .76.152l1.063-1.141c.129.016.255.032.385.041l.823 1.328a.457.457 0 0 0 .776 0l.823-1.328c.131-.009.256-.025.385-.041l1.063 1.141a.456.456 0 0 0 .76-.152l.548-1.459c.124-.036.249-.072.375-.113l1.26.911a.456.456 0 0 0 .719-.296l.251-1.537c.12-.063.235-.125.349-.187l1.416.645a.457.457 0 0 0 .645-.432l-.057-1.557c.105-.084.204-.161.297-.245l1.521.355a.46.46 0 0 0 .552-.547l-.36-1.521c.084-.099.167-.197.245-.297l1.563.052a.455.455 0 0 0 .432-.645l-.645-1.416c.061-.115.124-.229.181-.344l1.537-.251a.458.458 0 0 0 .296-.719l-.905-1.26l.113-.375l1.453-.548a.455.455 0 0 0 .157-.76l-1.141-1.068c.011-.124.027-.255.036-.385l1.329-.823a.45.45 0 0 0 0-.771zm-8.881 11c-1.224-.26-.833-2.099.396-1.839a.94.94 0 0 1-.396 1.839m-.448-3.047a.853.853 0 0 0-1.015.661l-.475 2.192A11.485 11.485 0 0 1 16 27.453a11.52 11.52 0 0 1-4.864-1.073l-.475-2.197a.848.848 0 0 0-1.016-.656l-1.937.411a10.809 10.809 0 0 1-1.005-1.183h9.443c.105 0 .177-.015.177-.115v-3.337c0-.1-.072-.115-.177-.115h-2.765v-2.12h2.989c.271 0 1.459.077 1.833 1.593c.12.464.381 1.979.557 2.464c.177.547.901 1.629 1.672 1.629h4.704a.98.98 0 0 0 .171-.015a11.09 11.09 0 0 1-1.067 1.255zM9.197 26.573a.95.95 0 0 1-1.119-.724a.933.933 0 0 1 .724-1.115a.94.94 0 0 1 .395 1.839M5.615 12.047a.945.945 0 0 1-.464 1.271a.948.948 0 0 1-1.255-.505c-.459-1.124 1.192-1.859 1.719-.765zm-1.099 2.609l2.02-.896c.433-.192.625-.697.433-1.129l-.417-.943h1.641v7.38H4.89a11.572 11.572 0 0 1-.375-4.412zm8.869-.713v-2.177h3.896c.203 0 1.421.235 1.421 1.147c0 .76-.937 1.031-1.703 1.031zm14.167 1.958c0 .287-.011.572-.031.853h-1.188c-.12 0-.167.079-.167.199v.541c0 1.281-.719 1.557-1.355 1.631c-.604.068-1.271-.251-1.353-.62c-.355-2-.948-2.427-1.885-3.167c1.161-.74 2.369-1.823 2.369-3.281c0-1.573-1.079-2.563-1.812-3.047c-1.032-.683-2.172-.817-2.48-.817H7.395a11.55 11.55 0 0 1 6.459-3.652l1.448 1.521a.854.854 0 0 0 1.208.025l1.615-1.547a11.55 11.55 0 0 1 7.911 5.631l-1.109 2.5a.863.863 0 0 0 .437 1.131l2.131.947c.036.381.052.761.052 1.152zM15.303 3.255c.905-.864 2.203.495 1.296 1.36c-.901.781-2.115-.495-1.296-1.36m10.984 8.838a.937.937 0 0 1 1.235-.479c.771.339.744 1.437-.037 1.74c-.787.301-1.541-.495-1.197-1.261z"/></svg>
				</div>
				<h3 class="card-title">Written in Rust</h3>
				<p class="card-desc">
					Core cryptographic engine built with Rust — a memory-safe language that eliminates
					buffer overflows, use-after-free, and data races at compile time.
				</p>
				<div class="rust-tags">
					<span class="tag">Memory Safe</span>
					<span class="tag">Zero-Cost Abstractions</span>
					<span class="tag">No GC Pauses</span>
				</div>
			</div>

			<div class="storage-card">
				<div class="lock-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
						<path d="M7 11V7a5 5 0 0 1 10 0v4" />
					</svg>
				</div>
				<h3 class="card-title">Quantum-Proof Storage</h3>
				<p class="card-desc">
					Private keys are encrypted with layered post-quantum algorithms, ensuring your assets
					remain secure even against future quantum computers.
				</p>
			</div>
		</div>

		<div class="primitives-card">
			<h3 class="primitives-title">Cryptographic Primitives</h3>
			<div class="primitives-grid">
				{#each cryptoPrimitives as primitive (primitive.name)}
					<div class="primitive">
						<div class="primitive-header">
							<span class="primitive-name">{primitive.name}</span>
							<span class="primitive-label">{primitive.label}</span>
						</div>
						<p class="primitive-desc">{primitive.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.security-section {
		padding: 0 8px;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.hero-card {
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		padding: 70px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 48px;
		overflow: hidden;
		position: relative;
	}

	.hero-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 600px;
	}

	.badge {
		display: inline-flex;
		align-self: flex-start;
		padding: 8px 20px;
		border-radius: 40px;
		font-size: 0.8125rem;
		font-weight: 600;
		font-family: var(--font-secondary);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: linear-gradient(270deg, rgba(172, 89, 255, 0.15), rgba(232, 5, 112, 0.15));
		color: var(--brand-purple);
		border: 1px solid rgba(172, 89, 255, 0.25);
	}

	.hero-title {
		font-size: clamp(2rem, 4vw, 3.25rem);
		font-weight: 600;
		line-height: 1.2;
		color: var(--text-primary);
		font-family: var(--font-secondary);
	}

	.hero-desc {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.shield-visual {
		flex-shrink: 0;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160px;
		height: 160px;
	}

	.shield-glow {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(172, 89, 255, 0.2) 0%, transparent 70%);
		filter: blur(20px);
	}

	.grid-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}

	.rust-card,
	.storage-card {
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		padding: 50px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		overflow: hidden;
	}

	.rust-icon {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-subtle);
		border-radius: 14px;
		color: var(--text-primary);
	}

	.lock-icon {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-subtle);
		border-radius: 14px;
	}

	.card-title {
		font-size: 1.375rem;
		font-weight: 600;
		color: var(--text-primary);
		font-family: var(--font-secondary);
		line-height: 1.3;
	}

	.card-desc {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
		max-width: 400px;
	}

	.rust-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 8px;
	}

	.tag {
		padding: 6px 14px;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 500;
		font-family: var(--font-secondary);
		color: var(--text-secondary);
		background: var(--bg-subtle);
		border: 1px solid var(--border-color);
	}

	.primitives-card {
		background: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: var(--card-radius);
		padding: 50px;
		display: flex;
		flex-direction: column;
		gap: 32px;
		overflow: hidden;
	}

	.primitives-title {
		font-size: 1.375rem;
		font-weight: 600;
		color: var(--text-primary);
		font-family: var(--font-secondary);
	}

	.primitives-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 2px;
	}

	.primitive {
		padding: 24px;
		background: var(--bg-subtle);
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.primitive:first-child {
		border-radius: 16px 0 0 16px;
	}

	.primitive:last-child {
		border-radius: 0 16px 16px 0;
	}

	.primitive-header {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.primitive-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		font-family: var(--font-secondary);
	}

	.primitive-label {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--brand-purple);
	}

	.primitive-desc {
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--text-secondary);
	}

	@media (min-width: 810px) and (max-width: 1199.98px) {
		.hero-card {
			padding: 50px;
		}

		.rust-card,
		.storage-card,
		.primitives-card {
			padding: 40px;
		}

		.primitives-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.primitive:first-child {
			border-radius: 16px 0 0 0;
		}

		.primitive:nth-child(3) {
			border-radius: 0 16px 0 0;
		}

		.primitive:nth-child(4) {
			border-radius: 0 0 0 16px;
		}

		.primitive:last-child {
			border-radius: 0 0 16px 0;
		}
	}

	@media (max-width: 809.98px) {
		.security-section {
			padding: 0 8px;
		}

		.hero-card {
			flex-direction: column;
			padding: 40px 28px;
			gap: 32px;
			border-radius: var(--border-radius-xl);
		}

		.shield-visual {
			width: 120px;
			height: 120px;
		}

		.shield-visual svg {
			width: 60px;
			height: 60px;
		}

		.grid-row {
			grid-template-columns: 1fr;
		}

		.rust-card,
		.storage-card,
		.primitives-card {
			padding: 32px 24px;
			border-radius: var(--border-radius-xl);
		}

		.primitives-grid {
			grid-template-columns: 1fr;
		}

		.primitive,
		.primitive:first-child,
		.primitive:last-child {
			border-radius: 16px;
		}

		.card-desc {
			max-width: 100%;
		}
	}
</style>
