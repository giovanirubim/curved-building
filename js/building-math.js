import {
	angle1,
	angle2,
	mainWidth,
	radius1,
	radius2,
} from './building-vars.js';
import { sum, sub, len, normal, scale, neg } from './vector-math.js';

const halfWidth = mainWidth * 0.5;
const [x1, y1] = [0, halfWidth + radius1];
const dist = radius1 + radius2 + mainWidth;
const x2 = Math.sin(angle1) * dist;
const y2 = y1 - Math.cos(angle1) * dist;
const ang = Math.PI / 2 - angle1 + angle2;
const x3 = x2 - Math.cos(ang) * (radius2 + mainWidth * 2);
const y3 = y2 + Math.sin(ang) * (radius2 + mainWidth * 2);
const circle1 = [0, y1];
const circle2 = [x2, y2];

export function applyRuler({ start, dir }, offset) {
	return sum(start, scale(dir, offset));
}

export function offsetAndLenToPoint(offset, len) {
	const r1 = radius1 + offset;
	const firstArc = r1 * angle1;
	if (len <= firstArc) {
		const angle = (len / firstArc) * angle1;
		const [cx, cy] = circle1;
		const x = cx + Math.sin(angle) * r1;
		const y = cy - Math.cos(angle) * r1;
		return [x, y];
	}
	const r2 = radius2 + mainWidth - offset;
	const secondArc = r2 * angle2;
	const tilt = ((len - firstArc) / secondArc) * angle2;
	const angle = Math.PI / 2 - angle1 + tilt;
	const [cx, cy] = circle2;
	const x = cx - Math.cos(angle) * r2;
	const y = cy + Math.sin(angle) * r2;
	return [x, y];
}

export function offsetAndLenToRuler(offset, len) {
	const r1 = radius1 + offset;
	const firstArc = r1 * angle1;
	if (len <= firstArc) {
		const angle = (len / firstArc) * angle1;
		const [cx, cy] = circle1;
		const radStart = radius1;
		const dir = [Math.sin(angle), -Math.cos(angle)];
		const x = cx + dir[0] * radStart;
		const y = cy + dir[1] * radStart;
		const start = [x, y];
		return { start, dir };
	}
	const r2 = radius2 + mainWidth - offset;
	const secondArc = r2 * angle2;
	const tilt = ((len - firstArc) / secondArc) * angle2;
	const angle = Math.PI / 2 - angle1 + tilt;
	const [cx, cy] = circle2;
	const radStart = radius2 + mainWidth;
	const dir = [Math.cos(angle), -Math.sin(angle)];
	const x = cx - dir[0] * radStart;
	const y = cy - dir[1] * radStart;
	const start = [x, y];
	return { start, dir };
}

export function solvePoint(point) {
	const delta = sub(point, circle1);
	const [dx, dy] = delta;
	const ang1 = Math.atan2(dx, -dy);
	const dist1 = len(delta);
	const arc1 = ang1 * dist1;
	const offset1 = dist1 - radius1;
	if (ang1 <= angle1) {
		const dir = normal(delta);
		const start = sum(circle1, scale(dir, radius1));
		const ruler = { start, dir };
		return { ruler, len: arc1, offset: offset1 };
	} else {
		const delta = sub(point, circle2);
		const [dx, dy] = delta;
		const dist2 = len(delta);
		const dir = normal(delta);
		const start = sum(circle2, scale(dir, radius2 + mainWidth));
		const ruler = { start, dir: neg(dir) };
		const offset2 = mainWidth - (dist2 - radius2);
		const ang2 = Math.atan2(dy, -dx) - (Math.PI / 2 - angle1);
		const len2 = angle1 * (radius1 + offset2) + dist2 * ang2;
		return { ruler, offset: offset2, len: len2 };
	}
}

export function offsetToFullLen(offset) {
	const r1 = radius1 + offset;
	const r2 = radius2 + mainWidth - offset;
	const arc1 = angle1 * r1;
	const arc2 = angle2 * r2;
	return arc1 + arc2;
}

export function buildCurve(offset, start, end) {
	const diff = end - start;
	const delta = Math.abs(diff);
	const sign = Math.sign(diff);
	const step = 1;
	const path = [];
	for (let i = 0; i < delta + step; i += step) {
		const len = start + sign * Math.min(delta, i);
		const point = offsetAndLenToPoint(offset, len);
		path.push(point);
	}
	return path;
}

export function advance(offset1, len1, offset2, len2, delta) {
	const newLen2 = transferLen(offset1, len1 + delta, offset2);
	const newLen1 = transferLen(offset2, len2 + delta, offset1);
	if (Math.abs(newLen2 - len2) > Math.abs(newLen1 - len1)) {
		return [len1 + delta, newLen2];
	} else {
		return [newLen1, len2 + delta];
	}
}

export function transferLen(offset, len, newOffset) {
	const ruler = offsetAndLenToRuler(offset, len);
	const point = applyRuler(ruler, newOffset);
	return solvePoint(point).len;
}

const leftLen = offsetToFullLen(0);
const rightLen = offsetToFullLen(mainWidth);

export function getValues() {
	return {
		circle1,
		radius1,
		circle2,
		radius2,
		leftLen,
		rightLen,
		corners: [
			offsetAndLenToPoint(mainWidth, 0),
			offsetAndLenToPoint(0, leftLen),
		],
	};
}
