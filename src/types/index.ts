//Карточка Товара
export type categories =
	| 'другое'
	| 'софт-скилс'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface ICardItem {
	category?: categories;
	id: string;
	price: number | null;
	title: string;
	image?: string;
	description?: string;
}

export interface IOrder {
	name: string;
	email: string;
	phone: string;
	payment: payment;
}

//Компонент Карточка товара
export interface Card {
	items: ICardItem[];
	render(card: ICardItem[]): void;
}

//Компонент Форма
export interface Form {
	setEmail(): void;
	setPhone(): void;
	setAdress(): void;
}

//Компонент модальное окно
export interface Modal {
	open(): void;
	close(): void;
}

//Тип оплаты товара
export type payment = 'Онлайн' | 'При получении';

export interface ICardList {
	items: ICardItem[];
}

export interface ICardApi<T> {
	items: T[];
	total: number;
}

export interface IBasketModel {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
}

export interface IOrder {
	orderDataBuyer: Map<string, payment>;
	add(): void;
}

export interface IModal {
	open(): void;
	close(): void;
}

export interface IPage {}

export interface IProduct {
	id: string;
	title: string;
}

export interface IAppState {
	items: ICardItem[];
	setItems(items: ICardItem[]): void;
}

export interface ApiResponse {
	items: ICardItem[];
	total: number;
}
