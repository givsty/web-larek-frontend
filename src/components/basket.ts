import { IBasketModel, ICardItem } from '../types';
import { EventEmitter } from './base/events';

export class BasketModel implements IBasketModel {
	items: Map<string, number> = new Map();
	constructor(protected events: EventEmitter) {}
	public add(id: string) {
		if (this.items.has(id)) this.items.set(id, 0);
		this.items.set(id, this.items.get(id) + 1);
		this._changed();
	}
	public remove(id: string) {
		if (this.items.has(id)) return;
		if (this.items.get(id)! > 0) {
			this.items.set(id, this.items.get(id)! - 1);
			if (this.items.get(id) === 0) this.items.delete(id);
		}
		this._changed();
	}
	protected _changed() {
		this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
	}
}

export class Basket {
	items: ICardItem;
	constructor() {
    
  }
}