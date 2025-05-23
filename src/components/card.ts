import { IBasketItem, IProduct } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { CDN_URL } from '../utils/constants';
import { Component } from './Component';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

interface ICard {
	price: number | null;
	title: string;
	description?: string;
	category?: string;
	image?: string;
	id?: number;
}

interface IColors {
	[key: string]: string
}

export class Card extends Component<ICard> {
	protected _category?: HTMLSpanElement;
	protected _title: HTMLTitleElement;
	protected _price: HTMLSpanElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLParagraphElement | null;
	protected _button: HTMLButtonElement | null;
	protected _indexItem: HTMLSpanElement;
	protected _basketCardTitle: HTMLSpanElement;
	protected _basketCardPrice: HTMLSpanElement;
	protected _basketItemDelete: HTMLButtonElement;

	protected colors: IColors = {
		'софт-скилс': '#83FA9D',
		"другое": '#FAD883',
		"дополнительное": '#B783FA',
		"кнопка": '#83DDFA',
		'хард-скил': '#FAA083',
	};

	constructor(
		container: HTMLElement,
		protected events: IEvents,
		actions?: ICardActions
	) {
		super(container);
		this._category = container.querySelector('.card__category');
		this._title = container.querySelector('.card__title');
		this._price = container.querySelector('.card__price');
		this._image = container.querySelector('.card__image');
		this._description = container.querySelector('.card__text');
		this._button = container.querySelector('.card__button');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			}
			container.addEventListener('click', actions.onClick);
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.style.background = this.colors[value]
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, CDN_URL + value);
	}

	set price(value: string) {
		this.setText(this._price, value !== null ? value : "бесценно");
	}
}
