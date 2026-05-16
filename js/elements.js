import { arc, ctx, tracePoints } from './canvas.js';

const elements = [];

const TYPE_PATH = 'path';
const TYPE_CIRCLE = 'circle';
const TYPE_ARC = 'arc';

export function addPath(points, color) {
	const path = {
		type: TYPE_PATH,
		points,
		color,
	};
	elements.push(path);
	return path;
}

export function addCircle(x, y, radius, color) {
	elements.push({
		type: TYPE_ARC,
		x,
		y,
		radius,
		start: 0,
		end: Math.PI * 2,
		color,
	});
}

export function addArc(x, y, radius, start, end, color) {
	elements.push({
		type: TYPE_ARC,
		x,
		y,
		radius,
		start,
		end,
		color,
	});
}

function drawPath({ points, color }) {
	ctx.strokeStyle = color;
	ctx.beginPath();
	tracePoints(points);
	ctx.stroke();
}

function drawCircle({ x, y, radius, color }) {
	ctx.strokeStyle = color;
	ctx.beginPath();
	arc(x, y, radius);
	ctx.stroke();
}

function drawArc({ x, y, radius, start, end, color }) {
	ctx.strokeStyle = color;
	ctx.beginPath();
	arc(x, y, radius, start, end);
	ctx.stroke();
}

const drawFnMap = {
	[TYPE_PATH]: drawPath,
	[TYPE_CIRCLE]: drawCircle,
	[TYPE_ARC]: drawArc,
};

export function drawElements() {
	for (const element of elements) {
		drawFnMap[element.type](element);
	}
}
