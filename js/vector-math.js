const { sin, cos, acos, atan2, sqrt } = Math;

export const sum = ([ax, ay], [bx, by]) => [ax + bx, ay + by];
export const sub = ([ax, ay], [bx, by]) => [ax - bx, ay - by];
export const dot = ([ax, ay], [bx, by]) => ax * bx + ay * by;
export const len = ([x, y]) => sqrt(x * x + y * y);
export const neg = ([x, y]) => [-x, -y];
export const scale = (vec, mul) => vec.map((val) => val * mul);
export const normal = (vec) => scale(vec, 1 / len(vec));
export const getAngleBetween = (a, b) => acos(dot(normal(a), normal(b)));
export const getGlobalAngle = ([x, y]) => atan2(y, x);

export const rotate = ([x, y], angle) => {
	const s = sin(angle);
	const c = cos(angle);
	return [x * c - y * s, y * c + x * s];
};
