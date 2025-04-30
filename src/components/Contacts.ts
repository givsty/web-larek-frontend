import { IEvents } from './base/events';
import { Form } from './Form';

export class Contacts extends Form {
	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
	}
}
