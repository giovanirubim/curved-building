import {
	buildCurve,
	getValues,
	offsetAndLenToPoint,
	offsetToFullLen,
} from './building-math.js';

import {
	leftGap,
	mainWidth,
	rightGap,
	roomWidth,
	wallWidth,
} from './building-vars.js';

import { addCircle, addPath } from './elements.js';

let currColor = '#fff';

function addCurve(offset, start, end) {
	const points = buildCurve(offset, start, end);
	addPath(points, currColor);
}

function addLine(a, b) {
	addPath([a, b], currColor);
}

// Room reference lines
const wallLine1 = leftGap + wallWidth * 0.5;
const wallLine2 = wallLine1 + roomWidth + wallWidth;
const wallLine4 = mainWidth - rightGap - wallWidth * 0.5;
const wallLine3 = wallLine4 - roomWidth - wallWidth;

function generateReferenceElements() {
	const { circle1, radius1, circle2, radius2, rightLen } = getValues();
	currColor = 'rgba(255, 255, 255, 0.25)';

	addCircle(circle1[0], circle1[1], radius1, currColor);
	addCircle(circle1[0], circle1[1], radius1 + mainWidth, currColor);
	addCircle(circle2[0], circle2[1], radius2, currColor);
	addCircle(circle2[0], circle2[1], radius2 + mainWidth, currColor);

	addPath([circle1, circle2]);
	addPath([circle1, offsetAndLenToPoint(0, 0)]);
	addPath([circle2, offsetAndLenToPoint(mainWidth, rightLen)]);

	addCurve(wallLine1, 0, offsetToFullLen(wallLine1));
	addCurve(wallLine2, 0, offsetToFullLen(wallLine2));
	addCurve(wallLine3, 0, offsetToFullLen(wallLine3));
	addCurve(wallLine4, 0, offsetToFullLen(wallLine4));
}

export function generateBuildingElements() {
	const { leftLen, rightLen } = getValues();

	generateReferenceElements();
	currColor = '#fff';

	// Perimeter
	addLine(offsetAndLenToPoint(0, 0), offsetAndLenToPoint(mainWidth, 0));
	addCurve(0, 0, leftLen);
	addCurve(mainWidth, 0, rightLen);
	addLine(
		offsetAndLenToPoint(0, leftLen),
		offsetAndLenToPoint(mainWidth, rightLen),
	);
}
