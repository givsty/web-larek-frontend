import { ICardItem } from '../types';
import { EventEmitter } from './base/events';

export class Card {
	protected category: HTMLSpanElement;
	protected title: HTMLTitleElement;
	protected price: HTMLSpanElement;
	protected image: HTMLImageElement;
	protected container: HTMLElement;
	protected description?: HTMLParagraphElement | null;
	constructor(container: HTMLElement) {
		this.container = container;
		this.category = container.querySelector('.card__category');
		this.title = container.querySelector('.card__title');
		this.price = container.querySelector('.card__price');
		this.image = container.querySelector('.card__image');
	}

	public render(data: ICardItem) {
		if (data) {
			this.category.textContent = data.category;
			this.title.textContent = data.title;
			data.price !== null
				? (this.price.textContent = data.price.toString())
				: (this.price.textContent = 'Бесценно');
			this.image.src = data.image
		}
		return this.container;
	}
}

export class CardView extends Card {
	protected buyButton: HTMLButtonElement;
	constructor(container: HTMLElement, events: EventEmitter) {
		super(container);
		this.buyButton = container.querySelector('.card__button');
		this.description = container.querySelector('.card__text');
		super.render;
	}
}
