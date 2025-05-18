import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ApiResponse, IBasketItem, IProduct } from './types';
import { cloneTemplate } from './utils/utils';
import { AppState } from './components/Appstate';
import { Modal } from './components/Modal';
import { BasketView } from './components/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/Success';

const cardBasket = document
	.getElementById('card-basket')
	.cloneNode(true) as HTMLTemplateElement;
const successTemplate = document
	.getElementById('success')
	.cloneNode(true) as HTMLTemplateElement;
const contactsTemplate = document
	.getElementById('contacts')
	.cloneNode(true) as HTMLTemplateElement;
const orderTemplate = document
	.getElementById('order')
	.cloneNode(true) as HTMLTemplateElement;
const productView = document
	.getElementById('card-preview')
	.cloneNode(true) as HTMLTemplateElement;
const mainPage = document.querySelector('.page') as HTMLElement;
const modalContainer = document.getElementById(
	'modal-container'
) as HTMLElement;
const itemCard = document
	.getElementById('card-catalog')
	.cloneNode(true) as HTMLTemplateElement;
const basketTemplate = document
	.getElementById('basket')
	.cloneNode(true) as HTMLTemplateElement;
const events = new EventEmitter();
const page = new Page(mainPage, events);
const api = new Api(API_URL);
const appState = new AppState(events);
const modal = new Modal(modalContainer, events);
const basket = new BasketView(cloneTemplate(basketTemplate), events);

events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// const basket = new BasketView()
events.on('items:change', (items: IProduct[]) => {
	page.setCatalog = items.map((item) => {
		const card = new Card(cloneTemplate(itemCard), events);
		card.setContent(item);
		return card.render();
	});
});

events.on('basket:change', (items: IBasketItem[]) => {
	basket.setBasket = items.map((item) => {
		const card = new Card(cloneTemplate(cardBasket), events);
		card.setBasketItem(item)
		return card.render();
	});
});

events.on('basket:open', () => {
	const basket = new BasketView(cloneTemplate(basketTemplate), events);
	modal.render({ content: basket.render() });
});

events.on('order:open', () => {
	const order = new Order(cloneTemplate(orderTemplate), events);
	modal.render({
		content: order.render({
			valid: false,
			errors: '',
		}),
	});
});

events.on('order:submit', ()=>{
	const success = new Success(cloneTemplate(successTemplate), events)
	modal.render({content: success.render()})
})

events.on('contacts:open', () => {
	const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
	modal.render({
		content: contacts.render({
			valid: false,
			errors: '',
		}),
	});
});

events.on('card:open', () => {
	const card = new Card(cloneTemplate(productView), events);
	modal.render({ content: card.render() });
});

api
	.get(`/product`)
	.then((res: ApiResponse) => {
		appState.setProduct(res.items);
	})
	.catch((err) => {
		console.log(err);
	});
