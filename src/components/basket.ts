import { IBasketModel } from "../types";
import { EventEmitter } from "./base/events";

export class Basket{
  constructor() {
    
  }
}
export class BasketModel implements IBasketModel {
	items: Map<string, number>;
	constructor(protected events: EventEmitter) {

  }
  public add(id: string) {
		this._changed();
	}
	public remove(id: string) {
		this._changed();
	}
	protected _changed() {
		this.events.emit('basket:change', { items: Array.from(this.items.keys())});
	}
}