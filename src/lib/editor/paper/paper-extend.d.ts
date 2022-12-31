import { Point } from 'paper';

declare module 'paper' {
	interface Point {
		rotate(angle: number, center?: Point): Point;
	}
}
