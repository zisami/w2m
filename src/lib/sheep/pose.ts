import type { valueRange, iPose } from '$lib/animal/animal.d';
const upperArm = {
	length: <valueRange>{
		min: 75,
		init: 75,
		max: 75
	},
	angle: {
		min: -15,
		init: 45,
		max: 135
	}
};
const lowerArm = {
	length: <valueRange>{
		min: 40,
		init: 40,
		max: 40
	},
	angle: {
		min: 0,
		init: 15,
		max: 135
	}
};
const hand = {
	length: <valueRange>{
		min: 20,
		init: 20,
		max: 20
	},
	angle: {
		min: 0,
		init: 20,
		max: 135
	}
};
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
								min: 25,
								init: 75,
								max: 100
							},
							angle: {
								min: -90,
								init: -45,
								max: 75
							},
							limbs: []
						},
						{
							name: 'elbow_R',
							length: upperArm.length,
							angle: upperArm.angle,
							limbs: [
								{
									name: 'wrist_R',
									length: lowerArm.length,
									angle: lowerArm.angle,
									limbs: [
										{
											name: 'hand_R',
											length: hand.length,
											angle: hand.angle,
											limbs: []
										}
									]
								}
							]
						},
						{
							name: 'elbow_L',
							length: upperArm.length,
							angle: { ...upperArm.angle, init: 90 },
							limbs: [
								{
									name: 'wrist_L',
									length: lowerArm.length,
									angle: { ...lowerArm.angle, init: 15 },
									limbs: [
										{
											name: 'hand_L',
											length: hand.length,
											angle: { ...hand.angle, init: 20 },
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
					angle: { ...upperLeg.angleRear, init: 45 },
					limbs: [
						{
							name: 'ankle_RR',
							length: lowerLeg.length,
							angle: { ...lowerLeg.angleRear, init: 0 },
							limbs: [
								{
									name: 'foot_RR',
									length: foot.length,
									angle: { ...foot.angleRear, init: 0 },
									limbs: []
								}
							]
						}
					]
				},
				{
					name: 'knee_RL',
					length: upperLeg.length,
					angle: upperLeg.angleRear,
					limbs: [
						{
							name: 'ankle_RL',
							length: lowerLeg.length,
							angle: lowerLeg.angleRear,
							limbs: [
								{
									name: 'foot_RL',
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
