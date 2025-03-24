import { ICardItem } from '../types';
import { EventEmitter } from './base/events';
import { CDN_URL } from '../utils/constants';

export class Card {
	protected category: HTMLSpanElement;
	protected title: HTMLTitleElement;
	protected price: HTMLSpanElement;
	protected image: HTMLImageElement;
	protected container: HTMLElement;
	protected description?: HTMLParagraphElement | null;

	protected colors = {
		'софт-скилс': '#83FA9D',
		'другое': '#FAD883',
		'дополнительное': '#B783FA',
		'кнопка': '#83DDFA',
		'хард-скил': '#FAA083',
	};

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
			for(let key in this.colors) {
				if(key === data.category) {
					console.log(`${this.colors[key]}`)
					this.category.style.backgroundColor = `${this.colors[key]}`
				}
			}

			this.title.textContent = data.title;
			data.price !== null
				? (this.price.textContent = data.price.toString())
				: (this.price.textContent = 'Бесценно');
			this.image.src = CDN_URL + data.image
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
