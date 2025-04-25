import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Card } from './components/Card';
import { Page } from './components/Page';
import {ApiResponse, IProduct } from './types';
import { cloneTemplate } from './utils/utils';
import { AppState } from './components/Appstate';
import { Modal } from './components/Modal';
import { BasketView } from './components/Basket';

const mainPage = document.querySelector('.page') as HTMLElement
const modalContainer = document.getElementById('modal-container') as HTMLElement
const itemCard = document.getElementById('card-catalog').cloneNode(true) as HTMLTemplateElement
const basketTemplate = document.getElementById('basket').cloneNode(true) as HTMLTemplateElement
const events = new EventEmitter
const page = new Page(mainPage , events)
const api = new Api(API_URL)
const appState = new AppState(events)
const modal = new Modal(modalContainer, events)
const basket = new BasketView(events, basketTemplate)
// const basket = new BasketView()
events.on('items:change', (items: IProduct[]) => {
	page.setCatalog = items.map((item)=>{
		const card = new Card(cloneTemplate(itemCard))
		return card.render(item)
	})
})

events.on("basket:open", ()=>{
  modal.open();
})

console.log(cloneTemplate(basketTemplate))

events.on('basket:change', ()=>{

})

events.on('', ()=>{

})

api
	.get(`/product`)
	.then((res: ApiResponse) => {
		console.log(res)
		appState.setItems(res.items);
	})
	.catch((err) => {
		console.log(err);
	});
console.log();