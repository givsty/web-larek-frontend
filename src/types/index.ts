import { EventEmitter } from "../components/base/events";

export interface CatalogItemCard {
	category: string;
	id: string;
	image: string;
	price: number | null;
	title: string;
}

export interface CatalogItemCardModal extends CatalogItemCard{
  description: string;
}

export interface BasketItem {
  counter: number;
  descrption: string;
  price: number;
}

export interface ICardApi {
	getCard: () => Promise<CatalogItemCardModal[]>;
	setItem(items: CatalogItemCard[]): void;
	getItem(id: string): CatalogItemCard;
}
