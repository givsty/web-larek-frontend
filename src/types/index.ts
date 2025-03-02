export interface ICardItem {
	category: string;
	id: string;
	price: number | null;
	title: string;
	image?: string;
	description?: string;
}

export interface CardList<T> {
	items: T[],
	total: number
}

export interface CardListModel<T> {
	items: T[],
	lodad(): Promise<void>
}

export interface ICardApi<T> {
	items: ICardItem[],
}

export interface Catalog {
	
}

export interface AppState{

}
