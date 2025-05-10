import {} from '../types';

export class Order {
	protected container: HTMLFormElement;
	protected buttonOnline: HTMLButtonElement;
	protected buttonOffline: HTMLButtonElement;

	constructor(containet: HTMLFormElement) {
		this.container = containet;
	}
	
	set address(address: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = address
	}
}
