import type { valueRange, iPose } from './animal.d';

const upperLeg = {
	length: <valueRange>{
		min: 75,
		init: 75,
		max: 75
	},
	angleFront: {
		min: -15,
		init: 45,
		max: 135
	},
	angleRear: {
		min: 0,
		init: 120,
		max: 135
	}
};
const lowerLeg = {
	length: <valueRange>{
		min: 40,
		init: 40,
		max: 40
	},
	angleFront: {
		min: 0,
		init: 15,
		max: 135
	},
	angleRear: {
		min: -180,
		init: -45,
		max: 0
	}
};
const foot = {
	length: <valueRange>{
		min: 20,
		init: 20,
		max: 20
	},
	angleFront: {
		min: 0,
		init: 20,
		max: 135
	},
	angleRear: {
		min: 0,
		init: 45,
		max: 135
	}
};
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
							length: upperLeg.length,
							angle: upperLeg.angleFront,
							limbs: [
								{
									name: 'ankle_FR',
									length: lowerLeg.length,
									angle: lowerLeg.angleFront,
									limbs: [
										{
											name: 'foot_FR',
											length: foot.length,
											angle: foot.angleFront,
											limbs: []
										}
									]
								}
							]
						},
						{
							name: 'knee_FL',
							length: upperLeg.length,
							angle: { ...upperLeg.angleFront, init: 90 },
							limbs: [
								{
									name: 'ankle_FL',
									length: lowerLeg.length,
									angle: { ...lowerLeg.angleFront, init: 15 },
									limbs: [
										{
											name: 'foot_FL',
											length: foot.length,
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
					length: upperLeg.length,
					angle: upperLeg.angleRear,
					limbs: [
						{
							name: 'ankle_RR',
							length: lowerLeg.length,
							angle: lowerLeg.angleRear,
							limbs: [
								{
									name: 'foot_RR',
									length: foot.length,
									angle: foot.angleRear,
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
