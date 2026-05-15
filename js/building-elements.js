import { buildCurve, getLeftLen, getRightLen, offsetAndLenToPoint, offsetToFullLen } from './building-math.js';
import { leftGap, mainWidth, rightGap, roomWidth, wallWidth } from './building-vars.js';

export function generateBuildingElements() {
	const paths = [];

	function addCurve(offset, start, end) {
		return paths.push(buildCurve(offset, start, end));
	}

	function addLine(a, b) {
		paths.push([a, b]);
	}

	// Perimeter
	addLine(offsetAndLenToPoint(0, 0), offsetAndLenToPoint(mainWidth, 0));
	addCurve(0, 0, getLeftLen());
	addCurve(mainWidth, 0, getRightLen());
	addLine(offsetAndLenToPoint(0, getLeftLen()), offsetAndLenToPoint(mainWidth, getRightLen()));

	// Room reference lines
	const offset1 = leftGap + wallWidth * 0.5;
	const offset2 = offset1 + roomWidth + wallWidth;
	const offset4 = mainWidth - rightGap - wallWidth * 0.5;
	const offset3 = offset4 - roomWidth - wallWidth;

	addCurve(offset1, 0, offsetToFullLen(offset1));
	addCurve(offset2, 0, offsetToFullLen(offset2));
	addCurve(offset3, 0, offsetToFullLen(offset3));
	addCurve(offset4, 0, offsetToFullLen(offset4));

	return paths;
}
