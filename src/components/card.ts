import { CardListModel } from "../types";

export class Card implements Card{
  category: string;
	id: string;
	price: number | null;
	title: string;
	image: string;
	description: string;
  
  constructor(data: Card) {
    this.category = data.category
    this.id = data.id
    this.price = data.price
    this.title = data.title
    this.image = data.image
    this.description = data.description
  }
}

export class CardList<T> implements CardListModel<T> {
	items: T[];
	async load() {
		const result = await this.api.load(
			this.pages.current, // передаём номер страницы
			this.searchQuery // и поисковый запрос
		);
	}
}