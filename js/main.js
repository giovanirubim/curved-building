import { applyOffset, applyZoom, setViewport } from './projection.js';
import { canvas, ctx, tracePoints } from './canvas.js';
import { generateBuildingElements } from './building-elements.js';

const paths = [];

function drawPaths() {
	ctx.strokeStyle = '#fff';
	ctx.beginPath();
	for (const path of paths) {
		tracePoints(path);
	}
	ctx.stroke();
}

const start = Date.now();
function render() {
	ctx.fillStyle = '#246';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawPaths();
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
paths.push(...generateBuildingElements());
render();
