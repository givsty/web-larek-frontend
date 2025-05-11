# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Документация

# 🏗️ Архитектура приложения (MVP + EventEmitter)

## 📌 Оглавление
1. [Принцип MVP](#-принцип-mvp)
2. [Структура классов](#-структура-классов)
   - [Model (Слой данных)](#-model-слой-данных)
   - [View (Слой отображения)](#-view-слой-отображения)
   - [Presenter (Посредник)](#-presenter-посредник)
3. [EventEmitter (События)](#-eventemitter-события)
4. [Взаимодействие компонентов](#-взаимодействие-компонентов)
5. [Пример инициализации](#-пример-инициализации)

---

## 🏛️ Принцип MVP
В качестве архитектуры была выбрана модель данных MVP

Model-View-Presenter (MVP) — шаблон проектирования, производный от MVC, который используется в основном для построения пользовательского интерфейса.
Элемент Presenter в данном шаблоне берёт на себя функциональность посредника (аналогично контроллеру в MVC) и отвечает за управление событиями пользовательского интерфейса (например, использование мыши) так же, как в других шаблонах обычно отвечает представление.
Взаимодействие строится на **событийно-ориентированном подходе** через `EventEmitter`.

---

## 🧩 Структура классов

### 🔷 Model (Слой данных)
#### Класс `Appstate`
Даный класс отвечает за общее состояние приложения

```typescript
constructor(protected events: IEvents) {
	this.events = events;
}
```
- **Параметры:**
- `protected events` — в качестве параметра принимает брокер событий events.

**Поля и методы:**
items: IProduct[];
basketItems: IBasketItem[];
order: IOrder;
basketTotal: number;
isOrderReady: boolean;
previewItem: IProduct
basket: IBasket;

- setProduct(items: IProduct[]) 
- setPreview(item: IProduct)
- setBasketItems(items: IBasketItem[])
- setOrder(order: IOrder) 
- addProduct(item: IBasketItem) 
- removeProduct(item: IBasketItem) 
- setAmount(amount: number) 

---

### 🔷 View (Слой отображения)

#### Класс `Basket`
Отображает интерфейс и передаёт действия пользователя.

```typescript
constructor(container: HTMLElement, protected events: IEvents)
```
- **Параметры:**
  - protected container: HTMLElement;
	- protected title: HTMLTimeElement;
	- protected containerBasket: HTMLElement;
	- protected basketList: HTMLUListElement;
	- protected button: HTMLButtonElement;
	- protected price: HTMLSpanElement;

**Поля и методы:**
- set setBasket(items: HTMLElement[]) 
- set setAmount(summ: number) 
- public render()

#### Класс `Card`
Отображает интерфейс и передаёт действия пользователя.

```typescript
constructor(container: HTMLElement, protected events: IEvents)
```
- **Параметры:**
  - protected category: HTMLSpanElement;
	- protected title: HTMLTitleElement;
	- protected price: HTMLSpanElement;
	- protected image: HTMLImageElement;
	- protected container: HTMLElement;
	- protected description?: HTMLParagraphElement | null;
	- protected button?: HTMLButtonElement | null
	- protected colors = {
		'софт-скилс': '#83FA9D',
		другое: '#FAD883',
		дополнительное: '#B783FA',
		кнопка: '#83DDFA',
		'хард-скил': '#FAA083',
	};

**Поля и методы:**
- setContent(data: IProduct)
- public render()

#### Класс `Contacts`
Отображает интерфейс и передаёт действия пользователя.

```typescript
constructor(container: HTMLFormElement, protected events: EventEmitter)
```
- **Параметры:**
  - protected container: HTMLFormElement;

**Поля и методы:**
- set setEmail(email: string) 
- set setPhone(phone: string) 

#### Класс `Form`
Отображает интерфейс и передаёт действия пользователя.

```typescript
constructor(container: HTMLFormElement, protected events: IEvents)
```
- **Параметры:**
  - protected container: HTMLFormElement;
	- protected submit: HTMLButtonElement

**Поля и методы:**
- public clear() 
- public render()

#### Класс `Modal`
Отображает интерфейс и передаёт действия пользователя.

```typescript
constructor()
```
- **Параметры:**
  - protected modal: HTMLElement;
	- protected modalContent: HTMLElement;
	- protected buttonClose: HTMLButtonElement;
	- protected container: HTMLElement;
	- protected events: IEvents;
	- protected items: IProduct;

**Поля и методы:**
- setContent(value: HTMLElement) 
- public close() 
- public open() 
- public render(value: HTMLElement) 

#### Класс `Order`
Отображает интерфейс и передаёт действия пользователя.

```typescript
constructor(container: HTMLFormElement, protected events: EventEmitter)
```
- **Параметры:**
  - protected container: HTMLFormElement;
	- protected buttonOnline: HTMLButtonElement;
	- protected buttonOffline: HTMLButtonElement;
	- protected buttonNext: HTMLButtonElement

**Поля и методы:**
- set setPayment(payment: orderType) 
- set address(address: string)

#### Класс `Page`
Отображает интерфейс и передаёт действия пользователя.

```typescript
constructor(container: HTMLElement, events: IEvents)
```
- **Параметры:**
  - protected headerBasket: HTMLButtonElement;
	- protected headerBasketCounter: HTMLSpanElement;
	- protected gallery: HTMLMediaElement;
	- protected catalog?: HTMLElement;
	- protected modal: HTMLElement;
	- protected modalTemplate: HTMLElement;
	- protected container: HTMLElement;
	- protected events: IEvents;

**Поля и методы:**
set setCatalog(items: HTMLElement[]) 
set setCount(items: HTMLElement[])

#### Класс `Success`
Отображает интерфейс и передаёт действия пользователя.


```typescript
constructor(container: HTMLElement, protected events: IEvents)
```
- **Параметры:**
  - protected container: HTMLElement;
	- protected title: HTMLTitleElement;
	- protected descriptions: HTMLParagraphElement;
	- protected button: HTMLButtonElement;

**Поля и методы:**
- set setSum(order: IOrder)
- public render()

## 🔄 Взаимодействие компонентов
1. **Пользователь** → `View` → `"userInput"`.
2. **`Presenter`** → обновляет `Model`.
3. **`Model`** → `Presenter` → `"dataUpdated"`.
4. **`View`** → перерисовывает интерфейс.

Типы данных
```typescript
export type categories =
	| 'другое'
	| 'софт-скилс'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type orderType = 'онлайн' | 'оффлайн'

export interface ApiResponse {
	total: number;
	items: IProduct[];
}

export interface IProduct {
	id: string;
	description: string;
	category: categories;
	title: string;
	image: string;
	price: number | null;
}

export interface IOrderForm {
	name: string;
	email: string;
	phone: number;
	address: string;
	payment: orderType
}

export interface IOrder extends IOrderForm{
	data: IOrderForm;
	items: IBasket
}

export interface IBasket {
	items: IBasketItem[];
	amount: number | null;
}

export interface IBasketItem {
	id: number;
	category: categories;
	price: number | null;
}

export interface IAppState {
	items: IProduct[];
	basketItems: IBasketItem[];
	order: IOrder | null;
	basketTotal: number;
	isOrderReady: boolean;
	basket: IBasket;
}
```

Модель данных Model

class AppState общий класс состояния приложения
```typescript
import { IAppState, IBasketItem, IProduct, IOrder, IBasket } from '../types';
import { EventEmitter, IEvents } from './base/events';

export class AppState implements IAppState {
	items: IProduct[];
	basketItems: IBasketItem[];
	order: IOrder;
	basketTotal: number;
	isOrderReady: boolean;
	previewItem: IProduct
	basket: IBasket;

	constructor(protected events: IEvents) {
		this.events = events;
	}

	setProduct(items: IProduct[]) {
		this.items = items;
		this.events.emit('items:change', this.items);
	}
	
	setPreview(item: IProduct) {
		this.previewItem = item
		this.events.emit('card:open')
	}

	setBasketItems(items: IBasketItem[]) {
		this.basketItems = items;
		this.events.emit('basket:change', this.items);
	}

	setOrder(order: IOrder) {
		this.order = order
		this.events.emit('order:change', this.order)
	}

	addProduct(item: IBasketItem) {
		this.basketItems.push(item)
		this.basket.amount += item.price
		this.events.emit('basket:change', item)
	}

	removeProduct(item: IBasketItem) {
		this.basket.items = this.basket.items.filter((basketItem) => basketItem.id !== item.id)
		this.basket.amount -= item.price
		this.events.emit('basket:change', this.items)
	}

	setAmount(amount: number) {
		this.basket.amount = amount
		this.events.emit('basket:change')
	}
}
```

Модель отображения View<br/>

class Card отображает карточку товара
```typescript
import { IProduct } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { CDN_URL } from '../utils/constants';


export class Card {
	protected category: HTMLSpanElement;
	protected title: HTMLTitleElement;
	protected price: HTMLSpanElement;
	protected image: HTMLImageElement;
	protected container: HTMLElement;
	protected description?: HTMLParagraphElement | null;
	protected button?: HTMLButtonElement | null
	protected colors = {
		'софт-скилс': '#83FA9D',
		другое: '#FAD883',
		дополнительное: '#B783FA',
		кнопка: '#83DDFA',
		'хард-скил': '#FAA083',
	};

	constructor(container: HTMLElement, protected events: IEvents) {
		this.container = container;
		this.category = container.querySelector('.card__category');
		this.title = container.querySelector('.card__title');
		this.price = container.querySelector('.card__price');
		this.image = container.querySelector('.card__image');
		this.description = container.querySelector('.card__text')
		this.button = container.querySelector('.card__button')

		this.container.addEventListener('click', (event) => {
			this.events.emit('card:open');
		});

		if(container.className === 'card_ful') {
			this.button.addEventListener('click', ()=>{
				this.events.emit('basket:open')
			})
		}
	}
	
	setContent(data: IProduct) {
		if (data) {
			this.category.textContent = data.category;
			for (let key in this.colors) {
				if (key === data.category) {
					this.category.style.backgroundColor = `${this.colors}`;
				}
				this.title.textContent = data.title;
				data.price !== null
					? (this.price.textContent = data.price.toString())
					: (this.price.textContent = 'Бесценно');
				this.image.src = CDN_URL + data.image;
			}
		}
	}
	public render() {
		return this.container;
	}
}

```
class Form родительский абстрактный класс формы
```typescript
import { EventEmitter, IEvents } from './base/events';

export abstract class Form {
	import { EventEmitter, IEvents } from './base/events';

export abstract class Form {
	protected container: HTMLFormElement;
	protected submit: HTMLButtonElement
	constructor(container: HTMLFormElement, protected events: IEvents) {
		this.submit = container.querySelector('button[type="submit"]')
		this.container = container;
		this.container.addEventListener('submit', (e)=>{
			e.preventDefault()
			this.events.emit(`${this.container.name}:submit`)
		})
	}

	public clear() {
		this.container.reset()
	}

	public render(){
		return this.container
	}
}

```
class Modal осуществляет открытие и закрытие модального окна
```typescript
import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { EventEmitter, IEvents } from './base/events';

export class Modal{
	protected modal: HTMLElement;
	protected modalContent: HTMLElement;
	protected buttonClose: HTMLButtonElement;
	protected container: HTMLElement;
	protected events: IEvents;
	protected items: IProduct;
	protected content: HTMLElement;
	constructor(container: HTMLElement, events: IEvents) {
		this.container = container;
		this.events = events;
		this.buttonClose = container.querySelector('.modal__close');
		this.modalContent = container.querySelector('.modal__content');
		this.container.addEventListener('click', this.close.bind(this));
		this.buttonClose.addEventListener('click', this.close.bind(this));
		this.modalContent.addEventListener('click', (event) => event.stopPropagation())
	}

	set setContent(value: HTMLElement) {
		this.content.replaceChildren(value)
	}

	public close() {
		this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
		this.modalContent = null
	}

	public open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	public render() {
		return this.container
	}
}
```

class BasketView отображает товары в корзине
```typescript
import { IBasketItem, IProduct } from '../types';
import { EventEmitter, IEvents } from './base/events';

export class BasketView {
	protected container: HTMLElement;
	protected title: HTMLTimeElement;
	protected containerBasket: HTMLElement;
	protected basketList: HTMLUListElement;
	protected button: HTMLButtonElement;
	protected price: HTMLSpanElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		this.container = container;
		this.title = container.querySelector('.modal__title');
		this.basketList = container.querySelector('.basket__list');
		this.containerBasket = container.querySelector('.modal__actions');
		this.button = this.containerBasket.querySelector('.basket__button');
		this.price = this.containerBasket.querySelector('.basket__price');
		if(this.button) {
			this.button.addEventListener('click', () => {
				events.emit('order:open');
			});	
		}
		
	}

	set setBasket(items: HTMLElement[]) {
		if(!items) {
			this.basketList.textContent = 'Корзина пуста'
		}
		this.basketList.replaceChildren(...items);
	}

	set setAmount(summ: number) {
		this.price.textContent = summ.toString()
	}
	
	public render() {
		return this.container;
	}
}
```

class Order форма заполнения заказа
```typescript
import { orderType } from '../types';
import { EventEmitter } from './base/events';
import { Form } from './Form';

export class Order extends Form{
	protected container: HTMLFormElement;
	protected buttonOnline: HTMLButtonElement;
	protected buttonOffline: HTMLButtonElement;
	protected buttonNext: HTMLButtonElement
	constructor(container: HTMLFormElement, protected events: EventEmitter) {
		super(container, events)
		this.container = container;
		this.buttonOffline = container.querySelector('button[name="cash"]')
		this.buttonOnline = container.querySelector('button[name="card"]')
		this.buttonNext = container.querySelector('button[name=""]')
		this.buttonOffline.addEventListener("click", ()=>{
			this.setPayment = 'cash'
		})
		this.buttonOnline.addEventListener('click', ()=>{
			this.setPayment = 'card'
		})
	}

	set setPayment(payment: orderType) {
		this.buttonOffline.classList.toggle("button_alt-active", payment === "cash");
		this.buttonOnline.classList.toggle("button_alt-active", payment === "card");
	}
	
	set address(address: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = address
	}
}

```

class Contacts форма заполнения телефона и почты
```typescript
import { EventEmitter, IEvents } from './base/events';
import { Form } from './Form';

export class Contacts extends Form{
	protected container: HTMLFormElement;
	constructor(container: HTMLFormElement, protected events: EventEmitter) {
		super(container, events)
		this.container = container
	}
	
	set setEmail(email: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = email
	}

	set setPhone(phone: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = phone
	}

}

```
class Success отбражает итоговый заказ 
```typescript
import { IOrder } from '../types';
import { IEvents } from './base/events';

export class Success {
	protected container: HTMLElement;
	protected title: HTMLTitleElement;
	protected descriptions: HTMLParagraphElement;
	protected button: HTMLButtonElement;
	constructor(container: HTMLElement, protected events: IEvents) {
		this.container = container;
		this.title = container.querySelector('.order-success__title');
		this.descriptions = container.querySelector('.order-success__description');
		this.button = container.querySelector('.button');
		this.button.addEventListener('click', () => {
			this.events.emit('modal:close');
		});
		this.container.addEventListener('click', () => {
			this.events.emit('modal:close');
		});
	}
	set setSum(order: IOrder) {
		this.descriptions.textContent = `Списано ${order.items.amount} синапсов`;
	}
	public render() {
		return this.container
	}
}

```

Основной класс для обработки событий
```typescript
//Класс для обработки событий
export class EventEmitter implements IEvents {
	_events: Map<EventName, Set<Subscriber>>;

	constructor() {
		this._events = new Map<EventName, Set<Subscriber>>();
	}

	/**
	 * Установить обработчик на событие
	 */
	on<T extends object>(eventName: EventName, callback: (event: T) => void) {
		if (!this._events.has(eventName)) {
			this._events.set(eventName, new Set<Subscriber>());
		}
		this._events.get(eventName)?.add(callback);
	}

	/**
	 * Снять обработчик с события
	 */
	off(eventName: EventName, callback: Subscriber) {
		if (this._events.has(eventName)) {
			this._events.get(eventName)!.delete(callback);
			if (this._events.get(eventName)?.size === 0) {
				this._events.delete(eventName);
			}
		}
	}

	/**
	 * Инициировать событие с данными
	 */
	emit<T extends object>(eventName: string, data?: T) {
		this._events.forEach((subscribers, name) => {
			if (name === '*')
				subscribers.forEach((callback) =>
					callback({
						eventName,
						data,
					})
				);
			if (
				(name instanceof RegExp && name.test(eventName)) ||
				name === eventName
			) {
				subscribers.forEach((callback) => callback(data));
			}
		});
	}

	/**
	 * Слушать все события
	 */
	onAll(callback: (event: EmitterEvent) => void) {
		this.on('*', callback);
	}

	/**
	 * Сбросить все обработчики
	 */
	offAll() {
		this._events = new Map<string, Set<Subscriber>>();
	}

	/**
	 * Сделать коллбек триггер, генерирующий событие при вызове
	 */
	trigger<T extends object>(eventName: string, context?: Partial<T>) {
		return (event: object = {}) => {
			this.emit(eventName, {
				...(event || {}),
				...(context || {}),
			});
		};
	}
}


```
- on: Установить обработчик на событие
- off: Снять обработчик с события
- emit: Инициировать событие с данными
- onAll: Слушать все события
- offAll: Сбросить все обработчики

События 

- Событие items:состояние карточек на странице
- Событие basket:состояние корзины
- Событие basket:open открытие окна с корзиной
- Событие card:open открытие карточки на главной странице
- Событие order:open открытие окна с формой заполнения заказа
- Событие order:submit отправка данных с формы заказа
- Событие contacts:submit отправка данных формы с контактными данными
