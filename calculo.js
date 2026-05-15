const total = 400;
const nFloors = 7;
const familias = 20;
const area = {
	individual: 26,
	duplo: 45,
	pcd_individual: 35.2,
	pcd_duplo: 58,
	unidade_familiar: 70,
};
const capacity = {
	individual: 1,
	duplo: 2,
	pcd_individual: 1,
	pcd_duplo: 2,
	unidade_familiar: 4,
};
const types = Object.keys(area);

const floor_count = {
	individual: 17 - 2,
	duplo: 14 - 2,
	pcd_individual: 1,
	pcd_duplo: 1,
	unidade_familiar: 4,
};

const count = Object.fromEntries(Object.entries(floor_count).map(([key, val]) => [key, val * nFloors]));
const total_quartos = Object.values(count).reduce((sum, val) => sum + val, 0);
const res = {
	por_andar: floor_count,
	qtd_geral: count,
	porcentagem_pcd: Math.floor(((count.pcd_individual + count.pcd_duplo) / total_quartos) * 1000) / 10,
	capacidade_pessoas: types.map((t) => capacity[t] * count[t]).reduce((a, b) => a + b, 0),
	familias: count.unidade_familiar,
	qtd_quartos: Object.values(count).reduce((a, b) => a + b, 0),
};

console.log(JSON.stringify(res, null, 2));
