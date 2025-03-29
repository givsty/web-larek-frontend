import { ICardItem, IModal } from "../types";
import { EventEmitter, IEvents } from "./base/events";
export class Modal implements IModal{
	protected modal:HTMLElement;
	protected modalContainer: HTMLElement;
	protected modalContent: HTMLElement
	protected buttonClose: HTMLButtonElement;
	protected container: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		this.container = container
		this.events = events
		this.modalContainer = container.querySelector('.modal__contaner')
		this.buttonClose = container.querySelector('.modal__close')
		this.modalContent = container.querySelector('.modal__content')
		
		this.buttonClose.addEventListener('click', ()=>{
			this.close()
		})
	}

	public close() {
    this.modal.classList.remove('modal_active')
		this.events.emit('modal:close')
	}

	public open() {
    this.modal.classList.add('modal_active')
		this.events.emit('modal:open')
  }

	public render(items: ICardItem) {
		
	}	
}