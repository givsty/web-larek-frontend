import { IBasketItem, IProduct } from '../types';
import { cloneTemplate } from '../utils/utils';
import { EventEmitter, IEvents } from './base/events';
import { Component } from './Component';

interface IBasketView {
	content: HTMLElement
}

export class BasketView extends Component<IBasketView>{
	protected container: HTMLElement;
	protected title: HTMLTimeElement;
	protected containerBasket: HTMLElement;
	protected basketList: HTMLUListElement;
	protected button: HTMLButtonElement;
	protected price: HTMLSpanElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)
		if(this.button) {
			this.button.addEventListener('click', () => {
				events.emit('order:open');
			});	
		}
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
