export class Modal {
	protected modal:HTMLElement;
	protected buttonClose: HTMLButtonElement;
	constructor(modal:HTMLElement) {
		this.modal = modal;
		this.buttonClose = modal.querySelector('.modal__close') as HTMLButtonElement;
	}
	public close() {
    this.modal.classList.remove("modal_active")
	}

	public open() {
    console.log('метод отработал')
    this.modal.classList.add('modal_active')
  }
}
