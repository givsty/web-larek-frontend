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


const mainPage = document.querySelector('.page') as HTMLElement
const itemCard = document.getElementById('card-catalog').cloneNode(true) as HTMLTemplateElement
const itemCardPreview = document.getElementById('card-preview') as HTMLTemplateElement
const basketTemplate = document.getElementById('basket').cloneNode(true) as HTMLTemplateElement
const page = new Page(mainPage)
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

events.on('basket:open', ()=>{
	page.setModal(cloneTemplate(basketTemplate))	
})


events.on('basket:change', ()=>{

})

events.on('',()=>{

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