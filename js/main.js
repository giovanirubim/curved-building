import { canvas, ctx, tracePoints } from './canvas.js';
import { generateBuildingElements } from './building-elements.js';
import { drawElements } from './elements.js';
import { getValues } from './building-math.js';

import {
	applyOffset,
	applyZoom,
	centralize,
	setViewport,
} from './projection.js';

const paths = [];

const start = Date.now();
function render() {
	ctx.fillStyle = '#246';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawElements();
}

function adjustScreen() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	setViewport(canvas);
	render();
}

window.addEventListener('resize', adjustScreen);

let startClick = null;

canvas.addEventListener('wheel', (e) => {
	const factor = 1 - Math.sign(e.deltaY) * 0.1;
	applyZoom(e.offsetX, e.offsetY, factor);
	render();
});

canvas.addEventListener('mousedown', (e) => {
	startClick = {
		x: e.offsetX,
		y: e.offsetY,
		dxApplied: 0,
		dyApplied: 0,
	};
});

canvas.addEventListener('mouseup', (e) => {
	startClick = null;
});

canvas.addEventListener('mousemove', (e) => {
	if (!startClick) return;
	const { x, y, dxApplied, dyApplied } = startClick;
	const dx = e.offsetX - x;
	const dy = e.offsetY - y;
	applyOffset(-dxApplied, -dyApplied);
	applyOffset(dx, dy);
	startClick.dxApplied = dx;
	startClick.dyApplied = dy;
	render();
});

adjustScreen();
generateBuildingElements();
centralize(getValues().corners);
render();
