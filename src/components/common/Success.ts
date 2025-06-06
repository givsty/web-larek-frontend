import { IOrder } from '../../types'
import { IEvents } from '../base/events';
import { Component } from '../base/Component';
interface ISucessActions {
	onClick: (event: MouseEvent) => void;
}

interface ISucсess {
	total: string;
}

export class Success extends Component<ISucсess> {
	protected container: HTMLElement;
	protected title: HTMLTitleElement;
	protected descriptions: HTMLParagraphElement;
	protected button: HTMLButtonElement;
	constructor(
		container: HTMLElement,
		protected events: IEvents,
		actions?: ISucessActions
	) {
		super(container);

		this.title = container.querySelector('.order-success__title');
		this.descriptions = container.querySelector('.order-success__description');
		this.button = container.querySelector('.order-success__close');

		if (actions?.onClick) {
			this.button.addEventListener('click', actions.onClick);
		}
	}
	set total(amount: string) {
		this.descriptions.textContent = `Списано ${amount} синапсов`;
	}
}
