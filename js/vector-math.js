export const sum = ([ax, ay], [bx, by]) => [ax + bx, ay + by];
export const sub = ([ax, ay], [bx, by]) => [ax - bx, ay - by];
export const len = ([x, y]) => Math.sqrt(x * x + y * y);
export const neg = ([x, y]) => [-x, -y];
export const scale = (vec, mul) => vec.map((val) => val * mul);
export const normal = (vec) => scale(vec, 1 / len(vec));
