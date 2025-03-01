export interface CardApi {
	category: string;
	id: string;
	price: number | null;
	title: string;
	image?: string;
	description?: string;
}

export interface CatalogListItem{
	items:CardApi[]
}

export interface CardModal {
	item: CardApi;
}

export interface Page<T>{
	catalogList: CatalogListItem[];
	cardModal: CardModal;
}

export interface Basket {
	items: CardApi[];
	amount: number;
}

export interface Registration {
	payment: 'Онлайн' | 'При получении'
	addres: string;
}

export interface Order extends Registration{
	number: string;
}