//Карточка Товара
export type categories =
	| 'другое'
	| 'софт-скилс'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface ApiResponse {
	total: number;
	items: IProduct[]
}

export interface IProduct {
	id: string;
	description: string;
	category: categories;
	title: string;
	image: string;
	price: number | null;
}

export interface IOrder {
	name: string;
	email: string;
	phone: number;
	address: string;
	items: IProduct[]
}

export interface IOrderResult {
	items: IOrder
	amount: number;
}

export interface IBasketItem {
	id: number;
	category: categories
	price: number | null;
}

export interface IModal {
	open(): void;
	close(): void;
}

export interface IAppState {
	//api
	getProduct: () => Promise<IProduct[]>
	productOrder: (order: IOrder) => Promise<IOrderResult[]>

	//
	items: IProduct[];
	basket: IBasketItem[];
	order: IOrder;
	basketTotal: number;
	isOrderReady: boolean;
	
	setProduct(items: IProduct[]): void;
	setBasketItems(basket: IBasketItem[]): void;
	setOrder(order: IOrder): void

	addProduct(id: string): void
	removeProduct(id: string): void
}










//Пока не актуально

// export interface ICardPreview {
// 	image: string;
// 	category: string;
// 	title: string;
// 	descriptions: string;
// 	price: string
// }

// export interface ICardBasket {
// 	amount: number;
// 	title: string;
// 	price: number;
// }

// export interface IOrder {
// 	name: string;
// 	email: string;
// 	phone: string;
// 	payment: payment;
// }

// //Компонент Карточка товара
// export interface Card {
// 	items: ICardCatalog[];
// 	render(card: ICardCatalog[]): void;
// }

// //Компонент Форма
// export interface Form {
// 	setEmail(): void;
// 	setPhone(): void;
// 	setAddress(): void;
// }

// //Компонент модальное окно
// export interface Modal {
// 	open(): void;
// 	close(): void;
// }

// //Тип оплаты товара
// export type payment = 'Онлайн' | 'При получении';

// export interface ICardList {
// 	items: IP[];
// }

// export interface ICardApi<T> {
// 	items: T[];
// 	total: number;
// }

// export interface IBasketModel {
// 	items: Map<string, number>;
// 	add(id: string): void;
// 	remove(id: string): void;
// }

// export interface IOrder {
// 	orderDataBuyer: Map<string, payment>;
// 	add(): void;
// }

// export interface IModal {
// 	open(): void;
// 	close(): void;
// }

// export interface IPage {}

// export interface IProduct {
// 	id: string;
// 	title: string;
// }

// export interface Contacts {
// 	email: string;
// 	phone: string;
// 	payment: payment;
// 	address: string;
// }

// export interface IBasketItems {
// 	items: ICardCatalog[]
// }


// export interface ApiResponse {
// 	items: ICardCatalog[];
// 	total: number;
// }