import { IBasketItem, IProduct } from '../types';
import { cloneTemplate, createElement, ensureElement } from '../utils/utils';
import { EventEmitter, IEvents } from './base/events';
import { Component } from './Component';

interface IBasketView {
	items: HTMLElement;
	total: number;
}

export class BasketView extends Component<IBasketView> {
	protected container: HTMLElement;
	protected title: HTMLTimeElement;
	protected containerBasket: HTMLElement;
	protected basketList: HTMLElement;
	protected button: HTMLButtonElement;
	protected price: HTMLSpanElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.basketList = ensureElement<HTMLElement>(
			'.basket__list',
			this.container
		);
		this.button = container.querySelector('.button');
		this.price = container.querySelector('.basket__price');

		if (this.button) {
			this.button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}
		this.setBasket = [];
	}

	set setBasket(items: HTMLElement[]) {
		if (items.length) {
			this.setDisabled(this.button, false);
			this.basketList.replaceChildren(...items);
		} else {
			this.setDisabled(this.button, true);
			this.basketList.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set setAmount(summ: number) {
		this.setText(this.price, `${summ} синапсов`);
	}

	public render() {
		return this.container;
	}
}
