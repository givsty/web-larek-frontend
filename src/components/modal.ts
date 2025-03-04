import { IModal } from "../types";

export class Modal implements IModal{
	protected modal:HTMLElement;
	protected buttonClose: HTMLButtonElement;
	constructor(modal:HTMLElement) {
		this.modal = modal;
		this.buttonClose = modal.querySelector('.modal__close') as HTMLButtonElement;
	}
	container: HTMLElement;

	public close() {
    this.modal.classList.remove("modal_active")
	}

	public open() {
    this.modal.classList.add('modal_active')
  }

}
