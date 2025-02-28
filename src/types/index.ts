import { EventEmitter } from '../components/base/events';

export interface CatalogItemCard {
	category: string;
	id: string;
	image: string;
	price: number | null;
	title: string;
}

export interface CatalogItemCardModal extends CatalogItemCard {
	description: string;
}

export interface CatalogPage<T> {
	cards: T[];
}

export interface BasketItem {
	counter: number;
	descrption: string;
	price: number;
}

export interface BasketPage {
	cardsBasket: BasketItem[]
}

export interface ICardApi {
	items: CatalogItemCard[]
}

export interface Order {
	amount: number
}
