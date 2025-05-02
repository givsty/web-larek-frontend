import { IProduct, IModal } from '../types';
import { ensureElement } from '../utils/utils';
import { EventEmitter, IEvents } from './base/events';

export class Modal implements IModal {
	protected modal: HTMLElement;
	protected modalContent: HTMLElement;
	protected buttonClose: HTMLButtonElement;
	protected container: HTMLElement;
	protected events: IEvents;
	protected items: IProduct;
	protected content: HTMLElement;
	constructor(container: HTMLElement, events: IEvents) {
		this.container = container;
		this.events = events;
		this.buttonClose = container.querySelector('.modal__close');
		this.modalContent = container.querySelector('.modal__content');
		this.container.addEventListener('click', (event) => {
			this.close.bind(this);
		});
		this.buttonClose.addEventListener('click', () => {
			this.close();
		});
	}

	public close() {
		this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
		this.modalContent.removeChild(this.content);
	}

	public open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	public render(content: HTMLElement) {
		this.content = content;
		this.modalContent.appendChild(content);
		this.open();
	}
}
