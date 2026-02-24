import type { Action } from 'svelte/action';

interface RevealOptions {
	delay?: number;
	y?: number;
	duration?: number;
	threshold?: number;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { delay = 0, y = 48, duration = 900, threshold = 0.1 } = options ?? {};

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;
	node.style.transition = [
		`opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
		`transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`
	].join(', ');

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.style.opacity = '1';
				node.style.transform = 'translateY(0)';
				observer.disconnect();
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
