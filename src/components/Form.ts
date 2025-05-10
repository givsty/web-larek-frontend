import { EventEmitter, IEvents } from './base/events';

export abstract class Form {
	protected container: HTMLFormElement;
	protected submit: HTMLButtonElement
	constructor(container: HTMLFormElement, protected events: IEvents) {
		this.submit = container.querySelector('button[type="submit"]')
		this.container = container;
		this.container.addEventListener('submit', ()=>{
			this.events.emit('form:submit')
		})
	}
	public render(){
		return this.container
	}
}