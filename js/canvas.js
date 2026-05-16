import { format } from './format.js';
import { proj, unProj } from './projection.js';

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

export function drawPin(vec) {
	const [x, y] = proj(vec);
	ctx.fillStyle = 'rgba(0, 127, 255, 0.5)';
	ctx.strokeStyle = '#bdf';
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, Math.PI);
	ctx.fill();
	ctx.stroke();
}

const blockOptions = [2, 3, 4, 5, 8];

export function drawScale() {
	let width = Math.round(canvas.width * 0.07);
	let half = Math.round(width / 2);
	let maxHalf = half * 1.5;
	width = half * 2;
	let height = Math.round(width * 0.1);
	let gap = height * 5;
	let x = canvas.width - width - gap;
	let y = canvas.height - height - gap;
	let refUnit = 10 ** Math.ceil(Math.log10(unProj(half)));
	let unit = refUnit;
	for (let i = blockOptions.length - 1; i >= 0; i--) {
		if (proj(unit) <= maxHalf) break;
		unit = (refUnit / 10) * blockOptions[i];
	}
	unit = unit.toPrecision(10) * 1;
	half = proj(unit);
	width = half * 2;
	x = gap;
	ctx.fillStyle = '#fff';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom';
	for (let i = 0; i < 3; i++) {
		ctx.fillText(i ? format(i * unit) : 0, x + half * i, y - height * 0.3);
	}
	ctx.fillRect(x, y, half, height);
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.stroke();
}
