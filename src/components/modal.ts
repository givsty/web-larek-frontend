import { ICardItem, IModal } from "../types";
import { EventEmitter, IEvents } from "./base/events";

export class Modal implements IModal{
	protected modal:HTMLElement;
	protected modalContent: HTMLElement
	protected buttonClose: HTMLButtonElement;
	protected container: HTMLElement;
	protected events: IEvents;
	protected items: ICardItem;
	
	constructor(container: HTMLElement, events: IEvents) {
		this.container = container
		this.events = events
		this.buttonClose = container.querySelector('.modal__close')
		this.modalContent = container.querySelector('.modal__content')
		this.buttonClose.addEventListener('click', ()=>{
			this.close()
		})
	}

	public close() {
    this.container.classList.remove('modal_active')
		this.events.emit('modal:close')
	}

	public open() {
    this.container.classList.add('modal_active')
		this.events.emit('modal:open')
  }

	public render(items: ICardItem) {
		this.items = items
	}	
}