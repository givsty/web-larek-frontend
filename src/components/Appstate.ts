import { IAppState, IBasketItem, IProduct, IOrder } from '../types';
import { EventEmitter, IEvents } from './base/events';

export class AppState implements IAppState {
	items: IProduct[];
	basketItems: IBasketItem[];
	order: IOrder;
	basketTotal: number;
	isOrderReady: boolean;
	previewItem: IProduct
	constructor(protected events: IEvents) {
		this.events = events;
	}

	setProduct(items: IProduct[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
	}
	
	setPreview(item: IProduct) {
		this.previewItem = item
		this.events.emit('card:open')
	}

	setBasketItems(items: IBasketItem[]) {
		this.basketItems = items;
		this.events.emit('basket:change', this.items);
	}

	setOrder(order: IOrder) {
		this.order = order;
	}

	addProduct(id: string) {}

	removeProduct(id: string) {}
	setAmount(amount: number) {}
}
