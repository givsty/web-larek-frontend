import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { EventEmitter, IEvents } from './base/events';

export class Modal{
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
		this.container.addEventListener('click', this.close.bind(this));
		this.buttonClose.addEventListener('click', this.close.bind(this));
		this.modalContent.addEventListener('click', (event) => event.stopPropagation())
	}

	set setContent(value: HTMLElement) {
		this.content.replaceChildren(value)
	}

	public close() {
		this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
		this.modalContent = null
	}

	public open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	public render() {
		return this.container
	}
}
