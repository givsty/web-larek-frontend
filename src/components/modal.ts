import { IModal } from "../types";

export class Modal implements IModal{
	protected modal:HTMLElement;
	protected buttonClose: HTMLButtonElement;
	constructor(container: HTMLElement) {
		this.modal = container;
		this.buttonClose = container.querySelector('.modal__close') as HTMLButtonElement;
	}

	public close() {
    this.modal.classList.remove("modal_active")
	}

	public open() {
    this.modal.classList.add('modal_active')
  }
}