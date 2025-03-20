import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { CatalogModel, ICardItem } from './types';
import { cloneTemplate } from './utils/utils';

const gallery = document.querySelector('.gallery')
const modal = document.querySelector('.modal') as HTMLElement
const basket = document.querySelector('.header__basket') as HTMLElement
const itemCard = document.getElementById('card-catalog').cloneNode(true) as HTMLTemplateElement
const page = new Page(document.querySelector('.page__wrapper'))

const events = new EventEmitter
const api = new Api(API_URL)
const catalogModel = new CatalogModel()

function renderCatalog(items: ICardItem[]) {
	page.setCatalog = items.map((item)=>{
		const card = new Card(cloneTemplate(itemCard))
		return card.render(item)
	})
}

events.on('catalog:change', (event: {items: ICardItem[]}) => {
	renderCatalog(event.items)
})

// events.on("items:change", (items: IProduct[]) => {
// 	page.catalog = items.map((item) => {
// 			const card = new Card(cloneTemplate(cardCatalogTemplate), {
// 					onClick: () => events.emit("card:select", item),
// 			});
// 			return card.render(item);
// 	});
// });

api.get(`/product`)
	.then(catalogModel.setItems.bind(catalogModel))
	.catch((err)=>{
		console.log(err)
	})
