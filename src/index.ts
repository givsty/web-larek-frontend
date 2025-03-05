import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/modal';
import './scss/styles.scss';
import { ICardItem } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const gallery = document.querySelector('.gallery')
const modal = document.querySelector('.modal') as HTMLElement
const basket = document.querySelector('.header__basket') as HTMLElement
const api = new Api('https://larek-api.nomoreparties.co')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
basket.addEventListener('click', ()=>{
	const modalBasket = new Modal(modal)
	modalBasket.open()
})

console.log(basketTemplate)
api.get('/api/weblarek/product')
	.then((res)=>{
		console.log(res)
	})
	.catch((err)=>{
		console.log(err)
	})
