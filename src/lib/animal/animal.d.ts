export type valueRange = {
	min: number;
	init: number;
	max: number;
};

export interface iPose {
	[key: string]: string | valueRange | iPose[] | undefined | null;
	name: string;
	length: valueRange;
	angle: valueRange;
	limbs: iPose[];
}
