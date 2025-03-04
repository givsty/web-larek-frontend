export interface ICardItem {
	category: string;
	id: string;
	price: number | null;
	title: string;
	image?: string;
	description?: string;
}

export type payment = 'Онлайн' | 'При получении'

export interface CardList {
	items: ICardItem[]
}

export interface ICardApi<T> {
	items: T[],
}

export interface IBasket {
	items: ICardItem[],
	ammount: number,
}

export interface IOrder {
	payment: payment,
	addres: string,
}

export interface ICustomer {
	email: string,
	phone: string,
}

export interface IOrderStatus {
	amount: number
}

export interface IModal {
	content: HTMLElement
}

export interface AppState {
	
}