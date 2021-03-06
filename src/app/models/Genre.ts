import {Artist} from "./Artist";

export class Genre {
	id: number;
	name: string;
	image: string;
	popularity: number;
	created_at: string;
	updated_at: string;
	artists?: Artist[];

	constructor(params: Object = {}) {
        for (let name in params) {
            this[name] = params[name];
        }
    }
}