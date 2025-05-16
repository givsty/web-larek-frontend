import { IProduct } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { CDN_URL } from '../utils/constants';
import { Component } from './Component';

interface ICard {
	content: HTMLElement
}

export class Card extends Component<ICard>{
	protected category: HTMLSpanElement;
	protected title: HTMLTitleElement;
	protected price: HTMLSpanElement;
	protected image: HTMLImageElement;
	protected container: HTMLElement;
	protected description?: HTMLParagraphElement | null;
	protected button?: HTMLButtonElement | null
	protected colors = {
		'софт-скилс': '#83FA9D',
		другое: '#FAD883',
		дополнительное: '#B783FA',
		кнопка: '#83DDFA',
		'хард-скил': '#FAA083',
	};

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container)
		this.container = container;
		this.category = container.querySelector('.card__category');
		this.title = container.querySelector('.card__title');
		this.price = container.querySelector('.card__price');
		this.image = container.querySelector('.card__image');
		this.description = container.querySelector('.card__text')
		this.button = container.querySelector('.card__button')

		this.container.addEventListener('click', (event) => {
			this.events.emit('card:open');
		});

		if(container.className === 'card_ful') {
			this.button.addEventListener('click', ()=>{
				this.events.emit('basket:open')
			})
		}
	}
	
	setContent(data: IProduct) {
		if (data) {
			this.category.textContent = data.category;
			for (let key in this.colors) {
				if (key === data.category) {
					this.category.style.backgroundColor = `${this.colors}`;
				}
				this.title.textContent = data.title;
				data.price !== null
					? (this.price.textContent = data.price.toString())
					: (this.price.textContent = 'Бесценно');
				this.image.src = CDN_URL + data.image;
			}
		}
	}
	public render() {
		return this.container;
	}
}

