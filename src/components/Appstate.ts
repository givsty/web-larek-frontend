import { IAppState, IBasketItem, IProduct, IOrder, IBasket } from '../types';
import { EventEmitter, IEvents } from './base/events';

export class AppState implements IAppState {
	items: IProduct[];
	basketItems: IBasketItem[] = [];
	order: IOrder;
	basketTotal: number;
	isOrderReady: boolean;
	previewItem: IProduct;
	basket: IBasket;
	amount: number = 0

	constructor(protected events: IEvents) {
		this.events = events;
	}

	setProduct(items: IProduct[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
	}

	setPreview(item: IProduct) {
		this.previewItem = item;
		this.events.emit('preview:changed', item);
	}

	setBasketItems(items: IBasketItem[]) {
		this.basketItems = items;
		this.events.emit('basket:change', this.items);
	}

	setOrder(order: IOrder) {
		this.order = order;
		this.events.emit('order:change', this.order);
	}

	addProduct(item: IBasketItem) {
		this.basketItems.push(item);
		// this.basket.amount += item.price
		this.events.emit('basket:change', item);
	}

	removeProduct(item: IBasketItem) {
		this.basketItems = this.getBasketItems().filter(
			(basketItem) => basketItem.id !== item.id
		);
		// this.basket.amount -= item.price;
		this.events.emit('basket:change', this.items);
	}

	setAmount(amount: number) {
		this.basket.amount = amount;
		this.events.emit('basket:change');
	}
	
	getBasketItems(): IBasketItem[] {
		return this.basketItems;
	}

	getAmount() {
		return this.basketItems.map((item)=> item.price).reduce((acc, number) => acc + number, 0)
	}
}
