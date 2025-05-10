import { IEvents } from './base/events';
import { Form } from './Form';

export class Contacts{
	protected container: HTMLFormElement;

	constructor(container: HTMLFormElement) {
		this.container = container
	}
	
	set setEmail(email: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = email
	}

	set setPhone(phone: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = phone
	}

}
