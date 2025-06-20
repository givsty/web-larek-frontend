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
		payment: 'online',
		total: 0,
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

	addProduct(item: IBasketItem) {
		this.basketItems.push(item);
		this.order.items.push(item.id);
		this.order.total += Number(item.id);
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
	
	getBasketItems(): IBasketItem[] {
		return this.basketItems;
	}

	getAmount() {
		this.order.total = this.basketItems
			.map((item) => item.price)
			.reduce((acc, number) => acc + number, 0);
		return this.order.total;
	}

	setValidateOrder(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	clearBasket() {
		this.basketItems.splice(0, this.basketItems.length);
		this.events.emit('basket:change', this.basketItems);
	}

	validateOrder() {
		const regexpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const regexpPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;
		const errors: typeof this.formsError = {};

		if (!this.order.payment) {
			errors.payment = 'Необходимо указать тип оплаты';
		}

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		} else if (!regexpPhone.test(this.order.phone)) {
			errors.phone = 'Такого номера не существует';
		}

		if (!this.order.email) {
			errors.email = 'Необходимо указать почту';
		} else if (!regexpEmail.test(this.order.email)) {
			errors.email = 'Не верный формат почты';
		}

		this.formsError = errors;
		this.events.emit('formErrors:change', this.formsError);
		return Object.keys(errors).length === 0;
	}
}
