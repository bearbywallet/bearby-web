<script lang="ts">
</script>

<nav class="nav" aria-label="Main navigation">
	<div class="nav-container">
		<a href="/#hero-header" class="nav-logo" aria-label="Bearby — home">
			<img src="/img/app-icon.png" alt="Bearby" class="nav-icon" />
			<span class="nav-logo-text">Bearby</span>
		</a>

		<div class="nav-links">
			<a href="/#about" class="nav-link">About</a>
			<a href="/#features" class="nav-link">Features</a>
			<a
				href="https://github.com/zilpay"
				class="nav-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				Github(Web)
			</a>
			<a href="/privacy-policy" class="nav-link">Privacy Policy</a>
		</div>

		<div class="nav-actions">
			<a href="/#downloads" class="nav-download">
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline
						points="7,10 12,15 17,10"
					></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg
				>
				Download (.apk)
			</a>
		</div>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		width: 100%;
		max-width: 1000px;
		padding: 0 24px;
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;
		padding: 12px 16px 12px 24px;
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 40px;
		border: 1px solid var(--border-color);
	}

	.nav-logo {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-primary);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		text-decoration: none;
	}

	.nav-icon {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.nav-link {
		font-size: 0.875rem;
		color: var(--text-secondary);
		transition: color 0.2s;
		text-decoration: none;
		white-space: nowrap;
	}

	.nav-link:hover {
		color: var(--text-primary);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.nav-download {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.875rem;
		color: var(--text-primary);
		padding: 10px 24px;
		border-radius: 40px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-decoration: none;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.nav-download:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 900px) {
		.nav {
			top: 0;
			padding: 0;
		}
		.nav-container {
			border-radius: 0;
			flex-wrap: wrap;
			justify-content: center;
		}
		.nav-links {
			display: none;
		}
	}
</style>
