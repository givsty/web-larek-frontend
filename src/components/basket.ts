import {  IProduct } from '../types';
import { EventEmitter } from './base/events';

export class BasketModel  {
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

export class BasketView {
  protected items: IProduct
  protected deleteButton: HTMLButtonElement;
  protected index: HTMLSpanElement;
  protected title: HTMLSpanElement;
  protected price: HTMLSpanElement;

  constructor(protected events: EventEmitter, container: HTMLElement, items?: IProduct) {
    this.items = items
    this.deleteButton = container.querySelector('.basket__item-delete ')
    this.title = container.querySelector('.card__title')
    this.index = container.querySelector('.basket__item-index')
    this.price = container.querySelector('.card__price')
  }
	
  public render() {
    this.price.textContent = this.items.price.toString()
    this.title.textContent = this.items.title
  }
}