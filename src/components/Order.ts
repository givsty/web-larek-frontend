import { IOrder, IOrderForm, orderType } from '../types';
import { EventEmitter } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<IOrderForm> {
	protected container: HTMLFormElement;
	protected buttonOnline: HTMLButtonElement;
	protected buttonOffline: HTMLButtonElement;
	protected buttonNext: HTMLButtonElement;

	constructor(container: HTMLFormElement, protected events: EventEmitter) {
		super(container, events);
		this.container = container;

		this.buttonOffline = container.querySelector('button[name="cash"]');
		this.buttonOnline = container.querySelector('button[name="card"]');
		this.buttonNext = container.querySelector('.order__button');

		this.buttonOffline.addEventListener('click', () => {
			this.onInputChange('payment', 'cash')
			this.payment = 'cash';
		});

		this.buttonOnline.addEventListener('click', () => {
			this.onInputChange('payment', 'online')
			this.payment = 'online';
		});
	}

	set payment(payment: orderType) {
		this.buttonOffline.classList.toggle(
			'button_alt-active',
			payment === 'cash'
		);
		this.buttonOnline.classList.toggle('button_alt-active', payment === 'online');
	}
	
	set address(address: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			address;
	}
}
