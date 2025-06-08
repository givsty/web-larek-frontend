import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Card } from './components/card';
import { Page } from './components/Page';
import {
	ApiResponse,
	IBasketItem,
	IOrder,
	IOrderForm,
	IProduct,
} from './types';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { AppState } from './components/Appstate';
import { Modal } from './components/common/Modal';
import { BasketView } from './components/common/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';

const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket')
const successTemplate = ensureElement<HTMLTemplateElement>('#success')
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts')
const orderTemplate = ensureElement<HTMLTemplateElement>('#order')
const productView = ensureElement<HTMLTemplateElement>('#card-preview')
const modalContainer = ensureElement<HTMLTemplateElement>('#modal-container');
const itemCard = ensureElement<HTMLTemplateElement>('#card-catalog')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket')

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
	page.setCount = appState.getBasketItems().length;
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

//Добавление товаров в корзину
events.on('basket:change', () => {
	page.setCount = appState.getBasketItems().length;
	basket.setBasket = appState
		.getBasketItems()
		.map((item: IBasketItem, index) => {
			const card = new Card(cloneTemplate(cardBasket), events, {
				onClick: () => {
					basket.setAmount = appState.getAmount();
					appState.removeProduct(item);
				},
			});
			return card.render({
				id: `${index + 1}`,
				title: item.title,
				price: item.price,
			});
		});
	basket.setAmount = appState.getAmount();
});

//Открытие корзины
events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
	modal.open();
});

//Открытие формы с заказом
events.on('order:open', () => {
	modal.render({
		content: order.render({
			valid: false,
			errors: '',
			address: '',
			payment: 'online',
		}),
	});
});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, email, phone } = errors;
	order.valid = !address;
	contacts.valid = !email && !phone;
	order.errors = Object.values({ address })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appState.setValidateOrder(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appState.setValidateOrder(data.field, data.value);
	}
);

//Отправка данных заказа на сервер
events.on('contacts:submit', () => {
	api
		.post('/order', appState.order)
		.then(() => {
			const success = new Success(cloneTemplate(successTemplate), events, {
				onClick: () => {
					modal.close();
				},
			});
			modal.render({
				content: success.render({
					total: appState.getAmount().toString(),
				}),
			});
			modal.open();
			appState.clearBasket()
		})
		.catch((error) => {
			console.log(appState.order);
			console.log(error);
		});
});

events.on('order:submit', () => {
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
