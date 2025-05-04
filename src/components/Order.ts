// import { IOrder, payment } from "../types"
// import { EventEmitter } from "./base/events";
// import { Form } from "./Form";
import {} from '../types';

export class Order {
	protected container: HTMLElement;
	protected buttonOnline: HTMLButtonElement;
	protected buttonOffline: HTMLButtonElement;

	constructor(containet: HTMLFormElement) {
		this.container = containet;
	}
	set setEmail(email: string) {

	}
	set address(address: string) {

	}
	set setPhone(phone: string) {

	}
	public render() {
		return this.container
	}
}
