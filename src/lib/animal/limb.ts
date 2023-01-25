import type { valueRange } from './animal.d';

export class LimbParam {
	#min: number;
	#init: number;
	#max: number;
	#last: number;

	constructor(params: valueRange) {
		//always use the lower value as min and the greater one as max
		this.#min = params.min <= params.max ? params.min : params.max;
		this.#max = params.max >= params.min ? params.max : params.min;
		//inital value has to be always within range
		if (params.init >= this.#min && params.init <= this.#max) {
			this.#init = params.init;
		} else if (params.init < this.#min) {
			this.#init = this.#min;
		} else {
			this.#init = this.#max;
		}
		this.#last = this.#init;
	}
	get min(): number {
		return this.#min;
	}
	get max(): number {
		return this.#max;
	}
	get init(): number {
		return this.#init;
	}
	get last(): number {
		return this.#last;
	}
	set last(value: number) {
		//make sure the value is within range
		if (value < this.#min) value = this.#min;
		if (value > this.#max) value = this.#max;
		this.#last = value;
	}
	isValid(value: number): boolean {
		return value >= this.#min && value <= this.#max;
	}
	//get random value within range of the LimbParam (min, max)
	getRandomValue(): number {
		return Math.random() * (this.#max - this.#min) + this.#min;
	}
}
