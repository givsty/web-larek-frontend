
export interface CatalogItemCard {
	category: string;
	description: string;
	id: string;
	image: string;
	price: number;
	title: string;
}

export interface CatalogItem{
  category: string;
  title: string;
  image: string;
  price: number;
}

export interface Basket {
  item: CatalogItem;
  finalPrice: number;
}

export interface BasketItem {
  position: string;
  name: string;
  price: number;
}
