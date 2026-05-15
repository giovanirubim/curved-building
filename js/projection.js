let pxPerMeter = 1;
let centerX = 0;
let centerY = 0;
let width = NaN;
let height = NaN;
let halfWidth = NaN;
let halfHeight = NaN;

export function proj(a, b) {
	if (b === undefined) {
		if (!(a instanceof Array)) return a * pxPerMeter;
		b = a[1];
		a = a[0];
	}
	const x = halfWidth + (a - centerX) * pxPerMeter;
	const y = halfHeight - (b - centerY) * pxPerMeter;
	return [x, y];
}

export function unProj(a, b) {
	if (b === undefined) {
		if (a instanceof Array) {
			b = a[1];
			a = a[0];
		} else {
			return a / pxPerMeter;
		}
	}
	const x = (a - halfWidth) / pxPerMeter + centerX;
	const y = (halfHeight - b) / pxPerMeter + centerY;
	return [x, y];
}

export function applyOffset(dx, dy) {
	centerX -= dx / pxPerMeter;
	centerY += dy / pxPerMeter;
}

export function applyZoom(mouseX, mouseY, factor) {
	const [x, y] = unProj(mouseX, mouseY);
	centerX = x - (x - centerX) / factor;
	centerY = y - (y - centerY) / factor;
	pxPerMeter = pxPerMeter * factor;
}

export function setViewport(viewport) {
	width = viewport.width;
	height = viewport.height;
	halfWidth = width / 2;
	halfHeight = height / 2;
}
