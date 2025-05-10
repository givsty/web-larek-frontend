import { IBasketItem, IProduct } from '../types';
import { EventEmitter, IEvents } from './base/events';

export class BasketView {
	protected container: HTMLElement;
	protected title: HTMLTimeElement;
	protected containerBasket: HTMLElement;
	protected basketList: HTMLUListElement;
	protected button: HTMLButtonElement;
	protected price: HTMLSpanElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		this.container = container;
		this.title = container.querySelector('.modal__title');
		this.basketList = container.querySelector('.basket__list');
		this.containerBasket = container.querySelector('.modal__actions');
		this.button = this.containerBasket.querySelector('.basket__button');
		this.price = this.containerBasket.querySelector('.basket__price');

		this.button.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	set setBasket(items: HTMLElement[]) {
		if(!items) {
			this.basketList.textContent = 'Корзина пуста'
		}
		this.basketList.replaceChildren(...items);
	}

	set setAmount(summ: number) {
		this.price.textContent = summ.toString()
	}
	
	public render() {
		return this.container;
	}
}
