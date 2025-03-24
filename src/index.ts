import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Card } from './components/Card';
import { Page } from './components/Page';
import {ApiResponse, ICardItem, IProduct } from './types';
import { cloneTemplate } from './utils/utils';
import { AppState } from './components/Appstate';
import { Modal } from './components/Modal';

const gallery = document.querySelector('.gallery')
const modal = document.querySelector('.modal') as HTMLElement
const basket = document.querySelector('.header__basket') as HTMLElement
const itemCard = document.getElementById('card-catalog').cloneNode(true) as HTMLTemplateElement
const page = new Page(document.querySelector('.page__wrapper'))
const basketTemplate = document.getElementById('basket').cloneNode(true) as HTMLTemplateElement
const events = new EventEmitter
const api = new Api(API_URL)
const appState = new AppState(events)


events.on('items:change', (items: ICardItem[]) => {
	console.log(items)
	page.setCatalog = items.map((item)=>{
		const card = new Card(cloneTemplate(itemCard))
		return card.render(item)
	})
})

basket.addEventListener('click', ()=>{
	new Modal(basketTemplate).open
})

api.get(`/product`)
	.then((res: ApiResponse)=>{
		appState.setItems(res.items)
	}
)
	.catch((err) => {
		console.log(err);
	});
console.log()