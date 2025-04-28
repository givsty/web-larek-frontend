import {  IBasketItem, IProduct } from '../types';
import { EventEmitter, IEvents } from './base/events';

export class BasketModel {
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
	protected container: HTMLElement;
	protected title: HTMLTimeElement;
	protected containerBasket: HTMLElement;
	protected basketList: HTMLUListElement;
	protected button: HTMLButtonElement;
	protected price: HTMLSpanElement
	
	constructor(container: HTMLElement, protected events: IEvents) {
		this.container = container
		this.title = container.querySelector('.modal__title')
		this.basketList = container.querySelector('.basket__list')
		this.containerBasket = container.querySelector('.modal__actions')
		this.button = this.containerBasket.querySelector('.basket__button')
		this.price = this.containerBasket.querySelector('.basket__price')

		this.button.addEventListener('click', ()=>{
			this.events.emit('order:open')
		})
	}
	
	set setBasket(items: HTMLElement[]) {
		this.basketList.replaceChildren(...items)
	}
	public render() {
		return this.container
	}
}