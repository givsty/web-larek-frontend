export interface ICardItem {
	category?: string;
	id: string;
	price: number | null;
	title: string;
	image?: string;
	description?: string;
}

export interface CardItem {
	items: ICardItem[];
	render(card: ICardItem[]): void;
}

export type payment = 'Онлайн' | 'При получении';

export interface ICardList {
	items: ICardItem[];
}

export interface ICardApi<T> {
	items: T[];
}

export interface IBasketModel {
	items: Map<string, number>
	add(id: string): void
	remove(id: string): void
}

export interface IOrder {
	orderDataBuyer: Map<string, payment>;
	add(): void
}

export interface IModal {
	open(): void;
	close(): void;
}
