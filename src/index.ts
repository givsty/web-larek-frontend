import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ApiResponse, IBasketItem, IOrder, IOrderForm, IProduct } from './types';
import { cloneTemplate, createElement } from './utils/utils';
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
const api = new Api(API_URL);
const appState = new AppState(events);
const modal = new Modal(modalContainer, events);
const basket = new BasketView(cloneTemplate(basketTemplate), events);
const page = new Page(document.body, events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});


//рендер карточек на главном экране
events.on('items:change', (items: IProduct[]) => {
	page.setCount = appState.getBasketItems().length
	page.setCatalog = items.map((item) => {
		const card = new Card(cloneTemplate(itemCard), events, {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			price: item.price,
			category: item.category,
			title: item.title,
			image: item.image,
		});
	});
});

// рендер выбранной карточки в модальном окне
events.on('preview:changed', (item: IProduct) => {
	const cardPreview = new Card(cloneTemplate(productView), events, {
		onClick: () => {
			appState.addProduct({
				id: item.id,
				title: item.title,
				price: item.price,
			});
		},
	});
	modal.render({
		content: cardPreview.render({
			price: item.price,
			category: item.category,
			title: item.title,
			image: item.image,
			description: item.description,
		}),
	});
});

events.on('basket:change', () => {
	page.setCount = appState.getBasketItems().length
	basket.setBasket = appState.getBasketItems().map((item: IBasketItem, index) => {
		const card = new Card(cloneTemplate(cardBasket), events, {
			onClick: () => {
				basket.setAmount = appState.getAmount()
				appState.removeProduct(item)
			},
		});
		return card.render({
			id: `${index + 1}`,
			title: item.title,
			price: item.price,
		});
	});
	basket.setAmount = appState.getAmount()
});

events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
	modal.open()
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			valid: false,
			errors: '',
			address: '',
		}),
	});
});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, email, phone} = errors;
	order.valid = !address
	contacts.valid = !email && !phone
	order.errors = Object.values({address}).filter(i => !!i).join('; ');
});

events.on(/^order\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
	appState.setValidateOrder(data.field, data.value);
});

events.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm, value: string }) => {
	appState.setValidateOrder(data.field, data.value);
});

events.on('order:submit', () => {
	const success = new Success(cloneTemplate(successTemplate), events);
	modal.render({ content: success.render() });
});

events.on('contacts:open', () => {
	modal.render({
		content: contacts.render({
			valid: false,
			errors: '',
			email: '',
			phone: '',
		}),
	});
});

events.on('card:select', (item: IProduct) => {
	appState.setPreview(item);
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

api
	.get(`/product`)
	.then((res: ApiResponse) => {
		appState.setProduct(res.items);
	})
	.catch((err) => {
		console.log(err);
	});
