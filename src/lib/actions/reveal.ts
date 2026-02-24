import type { Action } from 'svelte/action';

interface RevealOptions {
	delay?: number;
	y?: number;
	duration?: number;
}

const THRESHOLD = 0.1;

let sharedObserver: IntersectionObserver | null = null;
const nodeCallbacks = new WeakMap<Element, () => void>();

function getObserver(): IntersectionObserver {
	if (sharedObserver) return sharedObserver;

	sharedObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const cb = nodeCallbacks.get(entry.target);
					if (cb) {
						cb();
						nodeCallbacks.delete(entry.target);
					}
					sharedObserver!.unobserve(entry.target);
				}
			}
		},
		{ threshold: THRESHOLD }
	);

	return sharedObserver;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { delay = 0, y = 48, duration = 900 } = options ?? {};

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = [
		`opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
		`transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`
	].join(', ');

	nodeCallbacks.set(node, () => {
		node.style.opacity = '1';
		node.style.transform = 'translateY(0)';
	});

	getObserver().observe(node);

	return {
		destroy() {
			nodeCallbacks.delete(node);
			sharedObserver?.unobserve(node);
		}
	};
};
