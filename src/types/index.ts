//Карточка Товара
export type categories =
	| 'другое'
	| 'софт-скилс'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type orderType = 'cash' | 'card'

export interface ApiResponse {
	total: number;
	items: IProduct[];
}

export interface IProduct {
	id: string;
	description: string;
	category: categories;
	title: string;
	image: string;
	price: number | null;
}

export interface IOrderForm {
	name: string;
	email: string;
	phone: number;
	address: string;
	payment: orderType
}

export interface IOrder{
	data: IOrderForm;
	items: IBasket
}

export interface IBasket {
	items: IBasketItem[];
	amount: number | null;
}

export interface IBasketItem {
	id: string;
	title: string;
	price: number | null;
}

export interface IAppState {
	items: IProduct[];
	basketItems: IBasketItem[];
	order: IOrder | null;
	basketTotal: number;
	isOrderReady: boolean;
	basket: IBasket;
}
