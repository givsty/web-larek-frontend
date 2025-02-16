import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { CatalogItem } from './types';
import { API_URL, CDN_URL } from './utils/constants';

fetch(`https://larek-api.nomoreparties.co/api/weblarek/product`)
	.then((res) => res.json())
	.then((res) => {
		console.log(res);
	});

class CardItem {
	protected openButton: HTMLButtonElement;
	constructor() {
		this.openButton = document.querySelector('.header__basket');
		this.openButton.addEventListener('click', () => {
			console.log('Работает');
		});
	}
}
function renderCatalog() {}

new CardItem();
