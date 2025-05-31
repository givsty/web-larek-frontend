import {
	IAppState,
	IBasketItem,
	IProduct,
	IOrder,
	IBasket,
	FormErrors,
	IOrderForm,
	orderType,
} from '../types';
import { EventEmitter, IEvents } from './base/events';

export class AppState implements IAppState {
	items: IProduct[];
	basketItems: IBasketItem[] = [];
	order: IOrder = {
		email: '',
		phone: '',
		address: '',
		items: [],
		payment: 'online'
	};

	basketTotal: number;
	isOrderReady: boolean;
	previewItem: IProduct;
	basket: IBasket;
	amount: number = 0;
	formsError: FormErrors = {};

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
		this.events.emit('basket:change', item);
	}

	removeProduct(item: IBasketItem) {
		this.basketItems = this.getBasketItems().filter(
			(basketItem) => basketItem.id !== item.id
		);
		this.events.emit('basket:change', this.items);
	}

	setAmount(amount: number) {
		this.basket.amount = amount;
		this.events.emit('basket:change');
	}

	setPayment(method: orderType) {
		this.order.payment = method
	}

	getBasketItems(): IBasketItem[] {
		return this.basketItems;
	}

	getAmount() {
		return this.basketItems
			.map((item) => item.price)
			.reduce((acc, number) => acc + number, 0);
	}
	
	setValidateOrder(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		console.log(field)
		console.log(this.order[field])
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		} 
	}

	validateOrder() {
		const errors: typeof this.formsError = {};
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать тип оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.email) {
			errors.email = 'Необходимо указать почту';
		}
		this.formsError = errors;
		this.events.emit('formErrors:change', this.formsError);
		return Object.keys(errors).length === 0;
	}
}