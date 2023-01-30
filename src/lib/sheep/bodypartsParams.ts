import type { BodyPartParam } from '$lib/animal/bodyparts';

export function BodyPartParams(): BodyPartParam[] {
	const bodyPartparams = [
		{
			name: 'body',
			startPointName: 'hips',
			endPointName: 'shoulders',
			startRadius: 50,
			endRadius: 50
		},
		{
			name: 'neck',
			startPointName: 'shoulders',
			endPointName: 'head',
			startRadius: 50,
			endRadius: 30
		},
		{
			name: 'upperArmRight',
			startPointName: 'shoulders',
			endPointName: 'elbow_R',
			startRadius: 30,
			endRadius: 20
		},
		{
			name: 'lowerArmRight',
			startPointName: 'elbow_R',
			endPointName: 'wrist_R',
			startRadius: 20,
			endRadius: 10
		},
		{
			name: 'footRight',
			startPointName: 'wrist_R',
			endPointName: 'hand_R',
			startRadius: 10,
			endRadius: 10
		},

		{
			name: 'upperArmLeft',
			startPointName: 'shoulders',
			endPointName: 'elbow_L',
			startRadius: 30,
			endRadius: 20
		},
		{
			name: 'lowerArmLeft',
			startPointName: 'elbow_L',
			endPointName: 'wrist_L',
			startRadius: 20,
			endRadius: 10
		},
		{
			name: 'handLeft',
			startPointName: 'wrist_L',
			endPointName: 'hand_L',
			startRadius: 10,
			endRadius: 10
		},

		{
			name: 'upperLegRight',
			startPointName: 'hips',
			endPointName: 'knee_RR',
			startRadius: 30,
			endRadius: 20
		},
		{
			name: 'lowerLegRight',
			startPointName: 'knee_RR',
			endPointName: 'ankle_RR',
			startRadius: 15,
			endRadius: 10
		},
		{
			name: 'footRight',
			startPointName: 'ankle_RR',
			endPointName: 'foot_RR',
			startRadius: 10,
			endRadius: 10
		},

		{
			name: 'upperLegLeft',
			startPointName: 'hips',
			endPointName: 'knee_RL',
			startRadius: 30,
			endRadius: 20
		},
		{
			name: 'lowerLegLeft',
			startPointName: 'knee_RL',
			endPointName: 'ankle_RL',
			startRadius: 15,
			endRadius: 10
		},
		{
			name: 'footLeft',
			startPointName: 'ankle_RL',
			endPointName: 'foot_RL',
			startRadius: 10,
			endRadius: 10
		}
	];
	return bodyPartparams;
}
