import { IEvents } from './base/events';
import { Form } from './Form';

export class Contacts{
	protected container: HTMLFormElement;
	protected emailInput: HTMLInputElement
	protected phoneInput: HTMLInputElement
	protected button: HTMLButtonElement

	constructor(container: HTMLFormElement) {
		this.container = container
		this.emailInput = container.email
		this.phoneInput = container.phone
	}
	
	set setEmail(email: string) {
		
	}

	set setPhone(phone: string) {

	}
	public render() {
		return this.container
	}
}
