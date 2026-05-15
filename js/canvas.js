import { proj } from './projection.js';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');

export function tracePoints(points) {
	const n = points.length;
	const [x, y] = proj(points[0]);
	ctx.moveTo(x, y);
	for (let i = 1; i < n; i++) {
		const [x, y] = proj(points[i]);
		ctx.lineTo(x, y);
	}
}

export function arc(x, y, radius, start = 0, end = Math.PI * 2) {
	const [px, py] = proj(x, y);
	ctx.arc(px, py, proj(radius), start, end);
}
