import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL } from './utils/constants';

fetch('https://larek-api.nomoreparties.co/weblarek.postman.json')
	.then((res) => res.json())
	.then((res) => {
		console.log(res.item);
	});

class CardItem {
	protected openButton: HTMLButtonElement;
	constructor(
	) {
		this.openButton = document.querySelector('.header__basket');
		this.openButton.addEventListener('click', () => {
			console.log('Работает');
		});
	}
}

new CardItem()