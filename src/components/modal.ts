import { ICardCatalog, IModal } from "../types";
import { ensureElement } from "../utils/utils";
import { EventEmitter, IEvents } from "./base/events";
import { Component } from "./Compontent";

interface IModalData {
	content: HTMLElement
}

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}
	
}

// export class Modal implements IModal{
// 	protected modal:HTMLElement;
// 	protected modalContent: HTMLElement
// 	protected buttonClose: HTMLButtonElement;
// 	protected container: HTMLElement;
// 	protected events: IEvents;
// 	protected items: ICardCatalog;
	
// 	constructor(container: HTMLElement, events: IEvents) {
// 		this.container = container
// 		this.events = events
// 		this.buttonClose = container.querySelector('.modal__close')
// 		this.modalContent = container.querySelector('.modal__content')

// 		this.container.addEventListener('click', (event)=>{
// 			this.close.bind(this)
// 		})
// 		this.buttonClose.addEventListener('click', ()=>{
// 			this.close()
// 		})
// 	}

// 	public close() {
//     this.container.classList.remove('modal_active')
// 		this.events.emit('modal:close')
// 	}

// 	public open() {
//     this.container.classList.add('modal_active')
// 		this.events.emit('modal:open')
//   }

// 	public render(items: ICardCatalog) {
// 		this.items = items
// 	}	
// }