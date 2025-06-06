//Карточка Товара
export type categories =
	| 'другое'
	| 'софт-скилс'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type orderType = 'cash' | 'online'

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

export interface IOrderForm{
	address: string,
	payment: string,	
	email: string,
	phone: string
}

export interface IBasket {
	items: IBasketItem[];
	amount: number | null;
}

export interface IOrderItem {
	id: string
}

export interface IOrder extends IOrderForm {
	items: string[],
	total: number,
}

export type IAdd = IOrderItem & IBasketItem

export interface IBasketItem {
	id: string;
	title: string;
	price: number | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>

export interface IAppState {
	items: IProduct[];
	basketItems: IBasketItem[];
	order: IOrder | null;
	basketTotal: number;
	isOrderReady: boolean;
	basket: IBasket;
}
