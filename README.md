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

Interface Basket
```typescript
export interface ICardItem {
	category: string;
	id: string;
	price: number | null;
	title: string;
	image?: string;
	description?: string;
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
Interface BasketModel
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
class Card

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
```typescript
export class CardView extends Card{
  protected buyButton: HTMLButtonElement;
  constructor(container: HTMLElement, events: EventEmitter){
    super(container, events)
    this.buyButton = container.querySelector('.card__button')
    this.description = container.querySelector('.card__text')
    super.render
  }
}
```
class Form
```typescript
export class Form {
  protected input: HTMLInputElement;
  protected email: string;
  protected phone: string;
  protected adress: string;
  constructor(input: HTMLInputElement){
    this.input = input
  }
}
```
class Modal
```typescript
export class Modal implements IModal{
	protected modal:HTMLElement;
	protected buttonClose: HTMLButtonElement;
	constructor(modal:HTMLElement) {
		this.modal = modal;
		this.buttonClose = modal.querySelector('.modal__close') as HTMLButtonElement;
	}
	container: HTMLElement;

	public close() {
    this.modal.classList.remove("modal_active")
	}

	public open() {
    this.modal.classList.add('modal_active')
  }
}
```
