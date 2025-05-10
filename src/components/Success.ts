import { IOrder } from '../types';
import { IEvents } from './base/events';

export class Success {
	protected container: HTMLElement;
	protected title: HTMLTitleElement;
	protected descriptions: HTMLParagraphElement;
	protected button: HTMLButtonElement;
	constructor(container: HTMLElement, protected events: IEvents) {
		this.container = container;
		this.title = container.querySelector('.order-success__title');
		this.descriptions = container.querySelector('.order-success__description');
		this.button = container.querySelector('.button');
		this.button.addEventListener('click', () => {
			this.events.emit('modal:close');
		});
		this.container.addEventListener('click', () => {
			this.events.emit('modal:close');
		});
	}
	set setSum(order: IOrder) {
		this.descriptions.textContent = `Списано ${order.items.amount} синапсов`;
	}
	public render() {
		return this.container
	}
}
