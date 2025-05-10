import { EventEmitter, IEvents } from './base/events';

export abstract class Form {
	protected container: HTMLFormElement;
	protected submit: HTMLButtonElement
	constructor(container: HTMLFormElement, protected events: IEvents) {
		this.submit = container.querySelector('button[type="submit"]')
		this.container = container;
		this.container.addEventListener('submit', (e)=>{
			e.preventDefault()
			this.events.emit(`${this.container.name}:submit`)
		})
	}

	public clear() {
		this.container.reset()
	}

	public render(){
		return this.container
	}
}