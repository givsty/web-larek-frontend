import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Card} from './components/Card';
import { Page } from './components/Page';
import {ApiResponse, IBasketItem, IProduct } from './types';
import { cloneTemplate } from './utils/utils';
import { AppState } from './components/Appstate';
import { Modal } from './components/Modal';
import { BasketView } from './components/Basket';
import { Order } from './components/Order';

const orderTemplate = document.getElementById('order').cloneNode(true) as HTMLTemplateElement
const productView = document.getElementById('card-preview').cloneNode(true) as HTMLTemplateElement
const mainPage = document.querySelector('.page') as HTMLElement
const modalContainer = document.getElementById('modal-container') as HTMLElement
const itemCard = document.getElementById('card-catalog').cloneNode(true) as HTMLTemplateElement
const basketTemplate = document.getElementById('basket').cloneNode(true) as HTMLTemplateElement
const events = new EventEmitter
const page = new Page(mainPage , events)
const api = new Api(API_URL)
const appState = new AppState(events)
const modal = new Modal(modalContainer, events)

const basket = new BasketView(cloneTemplate(basketTemplate), events)
console.log(basket.render())
// const basket = new BasketView()
events.on('items:change', (items: IProduct[]) => {
	page.setCatalog = items.map((item)=>{
		const card = new Card(cloneTemplate(itemCard), events)
		card.setContent(item)
		return card.render()
	})
})

events.on('basket:change', (items: IProduct[])=>{
	basket.setBasket = items.map((item)=>{
		const card = new Card(cloneTemplate(itemCard), events)
		card.setContent(item)
		return card.render()
	}) 
})

events.on("basket:open", ()=>{
	const basket = new BasketView(cloneTemplate(basketTemplate), events)
	modal.open()
	return modal.render()
})

events.on("card:open", (item: IProduct)=>{
	const card = new Card(cloneTemplate(productView), events)
	modal.open()
	modal.render(card.render())
})

events.on("order:open", ()=>{
	const order = new Order(cloneTemplate(orderTemplate))
	modal.open()
	modal.render(order.render())
})

events.on("contacts:open", ()=>{
	const contancsTemplate = document.getElementById('contacts') as HTMLTemplateElement
	modal.open()
	modal.render(cloneTemplate(contancsTemplate))
})

console.log(cloneTemplate(basketTemplate))

// events.on('basket:change', (items: IProduct[])=>{
// 	basket.setBasket = items.map((item)=>{

// 		return card.render(item)
// 	})
// })

events.on('', ()=>{

})

api
	.get(`/product`)
	.then((res: ApiResponse) => {
		console.log(res)
		appState.setProduct(res.items);
	})
	.catch((err) => {
		console.log(err);
	});

