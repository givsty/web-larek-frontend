import { IBasketItem, IProduct } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { EventEmitter, IEvents } from './base/events';
import { Component } from './Component';

interface IBasketView {
	items: HTMLElement,
	total: number
	onClick: (event: MouseEvent)=> void 
}

export class BasketView extends Component<IBasketView>{
	protected container: HTMLElement;
	protected title: HTMLTimeElement;
	protected containerBasket: HTMLElement;
	protected basketList: HTMLElement;
	protected button: HTMLButtonElement;
	protected price: HTMLSpanElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)
		this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
		this.button = container.querySelector('.button')

		if(this.button) {
			this.button.addEventListener('click', () => {
				events.emit('order:open');
			});	
		}
	}

	set setBasket(items: HTMLElement[]) {
		if(items.length) {
			this.basketList.replaceChildren(...items);
		} else {
			this.basketList.textContent = 'asfafafafaf'
		}
	}

	set setAmount(summ: number) {
		this.price.textContent = summ.toString()
	}
	public render() {
		return this.container;
	}
}
