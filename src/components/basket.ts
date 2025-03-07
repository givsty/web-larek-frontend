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
    if(this.items.has(id)) this.items.set(id, 0)
    this.items.set(id, this.items.get(id) + 1)
		this._changed();
	}
	public remove(id: string) {
    //доделать
    if(this.items)
		this._changed();
	}
	protected _changed() {
		this.events.emit('basket:change', { items: Array.from(this.items.keys())});
	}
}