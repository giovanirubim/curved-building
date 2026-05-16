const units = [
	[1, 'm'],
	[0.01, 'cm'],
	[0.001, 'mm'],
];

export function format(m) {
	let unit = units[0];
	for (let i = 0; i < units.length; i++) {
		unit = units[i];
		const [scale] = unit;
		if (m >= scale) break;
	}
	const [scale, symbol] = unit;
	return Number((m / scale).toFixed(2)) + ' ' + symbol;
}
