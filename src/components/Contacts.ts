import { EventEmitter, IEvents } from './base/events';
import { Form } from './Form';

interface IContacts {
	content: HTMLElement
}

export class Contacts extends Form<IContacts>{
	protected container: HTMLFormElement;
	constructor(container: HTMLFormElement, protected events: EventEmitter) {
		super(container, events)
		this.container = container
	}
	
	set setEmail(email: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = email
	}

	set setPhone(phone: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = phone
	}
}
