import type { valueRange } from './limb';

export interface iPose {
	[key: string]: string | valueRange | iPose[] | undefined | null;
	name: string;
	length: valueRange;
	angle: valueRange;
	limbs: iPose[];
}

export const pose: iPose = {
	name: 'body',
	length: {
		min: 0,
		init: 200,
		max: 200
	},
	angle: {
		min: 0,
		init: 45,
		max: 45
	},
	limbs: [
		{
			name: 'hips',
			length: {
				min: 0,
				init: 0,
				max: 0
			},
			angle: {
				min: 0,
				init: 0,
				max: 0
			},
			limbs: [
				{
					name: 'shoulders',
					length: {
						min: 50,
						init: 150,
						max: 250
					},
					angle: {
						min: -180,
						init: 0,
						max: 0
					},
					limbs: [
						{
							name: 'head',
							length: {
								init: 75,
								min: 25,
								max: 100
							},
							angle: {
								init: -45,
								min: -90,
								max: 75
							},
							limbs: []
						},
						{
							name: 'knee_FR',
							length: {
								min: 50,
								init: 75,
								max: 100
							},
							angle: {
								min: -15,
								init: 45,
								max: 135
							},
							limbs: [
								{
									name: 'ankle_FR',
									length: {
										min: 20,
										init: 40,
										max: 60
									},
									angle: {
										min: 0,
										init: 15,
										max: 135
									},
									limbs: [
										{
											name: 'foot_FR',
											length: {
												min: 10,
												init: 20,
												max: 30
											},
											angle: {
												min: 0,
												init: 20,
												max: 135
											},
											limbs: []
										}
									]
								}
							]
						},
						{
							name: 'knee_FL',
							length: {
								min: 50,
								init: 75,
								max: 100
							},
							angle: {
								min: -15,
								init: 90,
								max: 135
							},
							limbs: [
								{
									name: 'ankle_FL',
									length: {
										min: 20,
										init: 40,
										max: 60
									},
									angle: {
										min: 0,
										init: 15,
										max: 135
									},
									limbs: [
										{
											name: 'foot_FL',
											length: {
												min: 10,
												init: 20,
												max: 30
											},
											angle: {
												min: 0,
												init: 20,
												max: 135
											},
											limbs: []
										}
									]
								}
							]
						}
					]
				},
				{
					name: 'knee_RR',
					length: {
						min: 50,
						init: 75,
						max: 100
					},
					angle: {
						min: 0,
						init: 120,
						max: 135
					},
					limbs: [
						{
							name: 'ankle_RR',
							length: {
								min: 20,
								init: 40,
								max: 60
							},
							angle: {
								min: -180,
								init: -45,
								max: 0
							},
							limbs: [
								{
									name: 'foot_RR',
									length: {
										min: 10,
										init: 20,
										max: 30
									},
									angle: {
										min: 0,
										init: 45,
										max: 135
									},
									limbs: []
								}
							]
						}
					]
				}
			]
		}
	]
};
