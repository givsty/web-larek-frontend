//Карточка Товара
export type categories =
	| 'другое'
	| 'софт-скилс'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface ICardCatalog {
	category: string;
	title: string;
	image: string;
	price: number | null;
}

export interface ICardPreview {
	image: string;
	category: string;
	title: string;
	descriptions: string;
	price: string
}

export interface ICardBasket {
	amount: number;
	title: string;
	price: number;
}

export interface IOrder {
	name: string;
	email: string;
	phone: string;
	payment: payment;
}

//Компонент Карточка товара
export interface Card {
	items: ICardCatalog[];
	render(card: ICardCatalog[]): void;
}

//Компонент Форма
export interface Form {
	setEmail(): void;
	setPhone(): void;
	setAddress(): void;
}

//Компонент модальное окно
export interface Modal {
	open(): void;
	close(): void;
}

//Тип оплаты товара
export type payment = 'Онлайн' | 'При получении';

export interface ICardList {
	items: ICardCatalog[];
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

export interface Contacts {
	email: string;
	phone: string;
	payment: payment;
	address: string;
}

export interface IBasketItems {
	items: ICardCatalog[]
}

export interface IAppState {
	items: ICardCatalog[];
	selectedItem: ICardCatalog;
	basket: IBasketItems[];
	order: IOrder;
	openedItem: ICardCatalog[]
	basketTotal: number;
	isOrderReady: boolean;

	setItems(items: ICardCatalog[]): void;
	setBasketItems(items: IBasketItems[]): void;
}

export interface ApiResponse {
	items: ICardCatalog[];
	total: number;
}
