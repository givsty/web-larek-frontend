import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { CatalogItemCard } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const gallery = document.querySelector('.gallery')



fetch(`https://larek-api.nomoreparties.co/api/weblarek/product`)
	.then((res) => res.json())
	.then((res) => {
		console.log(res)
		renderCatalog(res.items as []);
	})
	.catch((error) => {
		console.log(error);
	});

class CardItem {
	public cards: CatalogItemCard;
	protected category: HTMLElement;
	protected title: HTMLElement;
	protected image: HTMLImageElement;
	protected price: HTMLElement;
	protected priceValue: number | null
	
	getItem(card: CatalogItemCard, element:HTMLElement){
		
		this.category = element.querySelector('.card__category_soft');
		this.title = element.querySelector('.card__title');
		this.image = element.querySelector('.card__image');
		this.price = element.querySelector('.card__price');
		this.priceValue = card.price

		this.category.textContent = card.category
		this.title.textContent = card.title
		this.image.src = card.image
		this.price.textContent = this.priceValue!== null ? this.priceValue.toString() : '0'
		
		return element
	}
}

function renderCatalog(card: []) {
	const carditem = new CardItem()
	card.forEach((element) => {
		gallery.append(carditem.getItem(element, cloneTemplate(cardCatalogTemplate)))
	});
}

