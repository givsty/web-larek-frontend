import { ICardItem, IModal } from "../types";
import { EventEmitter, IEvents } from "./base/events";
export class Modal implements IModal{
	protected modal:HTMLElement;
	protected modalContainer: HTMLElement;
	protected modalContent: HTMLElement
	protected buttonClose: HTMLButtonElement;
	protected container: HTMLElement;
	protected events: IEvents;
	constructor(container: HTMLElement, content: HTMLElement) {
		this.modal = container.querySelector('.modal');
		this.modalContainer = this.modal.querySelector('.modal__container')
		this.modalContent = this.modalContainer.querySelector('.modal__content')
		this.container = container;
		this.buttonClose = this.modal.querySelector('.modal__close') as HTMLButtonElement;
		this.modalContent.append(content)
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