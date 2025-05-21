import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Component } from './Component';
import { Modal } from './Modal';

interface IPage {
	content: HTMLElement
}

interface IPage {
	onClick: (event: MouseEvent) =>void
}

export class Page extends Component<IPage> {
	protected headerBasket: HTMLElement;
	protected headerBasketCounter: HTMLSpanElement;
	protected gallery: HTMLMediaElement;
	protected catalog?: HTMLElement;
	protected modal: HTMLElement;
	protected modalTemplate: HTMLElement;
	protected container: HTMLElement;
	protected wrapper: HTMLElement
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.wrapper = ensureElement<HTMLElement>('.page__wrapper')
		this.headerBasket = ensureElement<HTMLElement>('.header__basket'); 
		this.catalog = ensureElement<HTMLElement>('.gallery');
		this.headerBasketCounter = ensureElement<HTMLElement>('.header__basket');

		this.headerBasket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set setCatalog(items: HTMLElement[]) {
		this.catalog.replaceChildren(...items);
	}

	set setCount(items: HTMLElement[]) {
		this.headerBasketCounter.textContent = items.length.toString();
	}	

	set locked(value: boolean){
		if(value) {
			this.wrapper.classList.add('page__wrapper_locked')
		} else {
			this.wrapper.classList.remove('page__wrapper_locked')
		}
	}
}
