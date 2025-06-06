import { IBasketItem, IProduct } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { CDN_URL } from '../utils/constants';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

interface ICard {
	price: number | null;
	title: string;
	description?: string;
	category?: string;
	image?: string;
	id?: string;
}

interface IColors {
	[key: string]: string;
}

export class Card extends Component<ICard> {
	protected _category?: HTMLSpanElement;
	protected _categoryView: HTMLSpanElement;
	protected _title: HTMLTitleElement;
	protected _price: HTMLSpanElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLParagraphElement | null;
	protected _button: HTMLButtonElement | null;
	protected _indexItem: HTMLSpanElement;
	protected _basketCardTitle: HTMLSpanElement;
	protected _basketCardPrice: HTMLSpanElement;
	protected _basketItemDelete: HTMLButtonElement;
	protected _selectorPreview: HTMLElement;
	protected colors: IColors = {
		'софт-скил': 'card__category card__category_soft',
		другое: 'card__category card__category_additional',
		дополнительное: 'card__category card__category_other',
		кнопка: 'card__category card__category_button',
		'хард-скил': 'card__category card__category_hard',
	};

	constructor(
		container: HTMLElement,
		protected events: IEvents,
		actions?: ICardActions
	) {
		super(container);
		this._category = container.querySelector('.card__category');
		this._category = container.querySelector('.card__category');
		this._title = container.querySelector('.card__title');
		this._price = container.querySelector('.card__price');
		this._image = container.querySelector('.card__image');
		this._description = container.querySelector('.card__text');
		this._button = container.querySelector('.card__button');
		this._selectorPreview = container.querySelector('.card_full');
		this._indexItem = container.querySelector('.basket__item-index');

		if (this._button) {
			this._button.addEventListener('click', actions.onClick);
		} else {
			container.addEventListener('click', actions.onClick);
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = this.colors[value];
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
		this.setText(
			this._price,
			value !== null ? `${value} синапсов` : 'бесценно'
		);
	}

	set id(value: string) {
		this.setText(this._indexItem, value);
	}
}
