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

type payment = 'Онлайн' | 'При получении'

export interface CardList {
	items: ICardItem[]
}

export interface ICardApi<T> {
	items: T[],
}

export interface IBasket {
	items: ICardItem[],
	ammount: number,
}

export interface IOrder {
	payment: payment,
	addres: string,
}

export interface ICustomer {
	email: string,
	phone: string,
}

export interface IOrderStatus {
	amount: number
}

export interface IModal {
	content: HTMLElement
}
```
Interface AppState
```typescript
export interface AppState {
	items: Map<string, ICardItem>;

	selectedCard: ICardItem;

	openModal(modal: HTMLElement):void

	loadApi: Promise<void>
}
```
