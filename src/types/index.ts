export interface ICardItem {
	category: string;
	id: string;
	price: number | null;
	title: string;
	image?: string;
	description?: string;
}

export interface CardItem {
	items: ICardItem[]
	render(card: ICardItem[]): void
}
export interface ICard {
}
export type payment = 'Онлайн' | 'При получении'

export interface ICardList {
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
	open(): void
	close(): void
}

export interface AppState {
	items: Map<string, ICardItem>;

	selectedCard: ICardItem;

	openModal(modal: HTMLElement):void

	loadApi: Promise<void>
}