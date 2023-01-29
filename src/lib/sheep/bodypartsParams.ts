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
			name: 'uppLegLeftFront',
			startPointName: 'shoulders',
			endPointName: 'knee_FR',
			startRadius: 30,
			endRadius: 20
		},
		{
			name: 'lowerLegLeftFront',
			startPointName: 'knee_FR',
			endPointName: 'ankle_FR',
			startRadius: 20,
			endRadius: 10
		},
		{
			name: 'footLegLeftFront',
			startPointName: 'ankle_FR',
			endPointName: 'foot_FR',
			startRadius: 10,
			endRadius: 10
		}
	];
	return bodyPartparams;
}
