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
В качестве архитектуры была выбрана модель данных MVP

Model-View-Presenter (MVP) — шаблон проектирования, производный от MVC, который используется в основном для построения пользовательского интерфейса.
Элемент Presenter в данном шаблоне берёт на себя функциональность посредника (аналогично контроллеру в MVC) и отвечает за управление событиями пользовательского интерфейса (например, использование мыши) так же, как в других шаблонах обычно отвечает представление.

Типы данных
```typescript
export interface ICardItem {
	category: string;
	id: string;
	price: number | null;
	title: string;
	image: string;
	description: string;
}

export interface CardItem {
	items: ICardItem[];
	render(card: ICardItem[]): void;
}

export type payment = 'Онлайн' | 'При получении';

export interface ICardList {
	items: ICardItem[];
}

export interface ICardApi<T> {
	items: T[];
}

export interface IBasketModel {
	items: Map<string, number>
	add(id: string): void
	remove(id: string): void
}

export interface IOrder {
	payment: payment;
	addres: string;
}

export interface ICustomer {
	email: string;
	phone: string;
}

export interface IOrderStatus {
	amount: number;
}

export interface IModal {
	open(): void;
	close(): void;
}
```

Модель данных Model

Interface BasketModel 
class BasketModel реализует добавление и удаление данных в корзине
```typescript
export class BasketModel implements IBasketModel {
	items: Map<string, number> = new Map();
	constructor(protected events: EventEmitter) {}
	public add(id: string) {
		if (this.items.has(id)) this.items.set(id, 0);
		this.items.set(id, this.items.get(id) + 1);
		this._changed();
	}
	public remove(id: string) {
		if (this.items.has(id)) return;
		if (this.items.get(id)! > 0) {
			this.items.set(id, this.items.get(id)! - 1);
			if (this.items.get(id) === 0) this.items.delete(id);
		}
		this._changed();
	}
	protected _changed() {
		this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
	}
}
```

Модель отображения View
class Card отображает карточку товара
```typescript
export class Card{
  protected category: HTMLSpanElement;
  protected title: HTMLTitleElement;
  protected price: HTMLSpanElement;
  protected image: HTMLImageElement
  protected container: HTMLElement;
  protected events:EventEmitter
  protected description?: HTMLParagraphElement | null

  constructor(container: HTMLElement, events: EventEmitter) {
    this.container = container
    this.events = events
    this.category = container.querySelector('.card__category')
    this.title = container.querySelector('.card__title')
    this.price = container.querySelector('.card__price')
    this.image = container.querySelector('.card__image')
  }

  public render(data: ICardItem) {
    this.category.textContent = data.category
    this.title.textContent = data.title
    this.price.textContent = data.price.toString()
    this.image.textContent = data.image
    this.description.textContent = data.description

    return this.container
  }
}
```
class CardView

Отображение данных карточки при нажатии на нее
```typescript
export class CardView extends Card{
  protected buyButton: HTMLButtonElement;
	//Конструктор принимает разметку карточки и событие
  constructor(container: HTMLElement, events: EventEmitter){
    super(container, events)
    this.buyButton = container.querySelector('.card__button')
    this.description = container.querySelector('.card__text')
    super.render
  }
}
```
class Form
С помощью класса форм устанавливается значение данных в форме, где пользователь указывает email, phone, adress
```typescript
export class Form {
  protected input: HTMLInputElement;
  protected email: string;
  protected phone: string;
  protected adress: string;
	//Конструктор принимает html разметку с формой
  constructor(container: HTMLInputElement){
    this.input = container
  }

	//Установление почты
  set setEmail(email: string) {
    this.email = email
  }
	//Установление телефона
  set setPhone(phone: string) {
    this.phone = phone
  }
	//Установление адреса
  set setAdress(adress: string) {
    this.adress = adress
  }
}

```
class Modal осуществляет открытие и закрытие модального окна
```typescript
export class Modal implements IModal{
	protected modal:HTMLElement;
	protected buttonClose: HTMLButtonElement;

	//Конструктор принимает разметку модального окна
	constructor(modal:HTMLElement) {
		this.modal = modal;
		this.buttonClose = modal.querySelector('.modal__close') as HTMLButtonElement;
	}
	container: HTMLElement;

	//Открытие модального окна
	public close() {
    this.modal.classList.remove("modal_active")
	}

	//Закрытие модального окна
	public open() {
    this.modal.classList.add('modal_active')
  }
}
```

class BasketView отображает товары в корзине
```typescript
export class BasketView {
  protected items: ICardItem
  protected deleteButton: HTMLButtonElement;
  protected index: HTMLSpanElement;
  protected title: HTMLSpanElement;
  protected price: HTMLSpanElement;

	//Данный конструктор принимает событие данные карточки и саму карточку
  constructor(protected events: EventEmitter, items: ICardItem, container: HTMLElement) {
    this.items = items
    this.deleteButton = container.querySelector('.basket__item-delete ')
    this.title = container.querySelector('.card__title')
    this.index = container.querySelector('.basket__item-index')
    this.price = container.querySelector('.card__price')
  }

	//Установка значений
  public render() {
    this.price.textContent = this.items.price.toString()
    this.title.textContent = this.items.title
  }
}
```
class OrderSuccess отбражает итоговый заказ 
```typescript
export class OrderSuccess {
  protected amount: number;
  protected backButton: HTMLButtonElement;
  protected descriptions: HTMLParagraphElement
  constructor(protected events: EventEmitter, amount: number) {
    this.amount = amount
  }
	//Отображение итоговой суммы заказа
  setSumm() {
    this.descriptions.textContent = this.amount.toString()
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

- Событие basket:change: изменение состояния корзины
- Событие modal:open: открытие модального окна
- Событие modal:close: закрытие модального окна