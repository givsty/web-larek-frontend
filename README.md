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

---

## 🏛️ Принцип MVP
В качестве архитектуры была выбрана модель данных MVP

Model-View-Presenter (MVP) — шаблон проектирования, производный от MVC, который используется в основном для построения пользовательского интерфейса.
Элемент Presenter в данном шаблоне берёт на себя функциональность посредника (аналогично контроллеру в MVC) и отвечает за управление событиями пользовательского интерфейса (например, использование мыши) так же, как в других шаблонах обычно отвечает представление.
Взаимодействие строится на **событийно-ориентированном подходе** через `EventEmitter`.

---
## Типы данных 
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
- в качестве параметра принимает брокер событий events.

**Методы:**
- setProduct(items: IProduct[]) данный метод устанавливает список товаров и осуществляет изменение состояния
- setPreview(item: IProduct) данный устанавливает данные товара для просмотра полного описания
- setBasketItems(items: IBasketItem[]) данный метод устанавливает список товаров в корзине
- setOrder(order: IOrder) данный метод устанавливает значение итогового заказа 
- addProduct(item: IBasketItem) данный метод реализует добавление товара
- removeProduct(item: IBasketItem) данный метод реализует удаление товара
- setAmount(amount: number) данный метод устанавливает итоговую стоимость всех товаров

---

### 🔷 View (Слой отображения)

#### Класс `Basket`
Данный класс отображает корзину приложения с товарами, их количеством и их итоговой суммой.

```typescript
constructor(container: HTMLElement, protected events: IEvents)
```
**Параметры:**
в качестве параметров конструктор принимает темплейт корзины и брокер событий events

**Методы:**
- set setBasket(items: HTMLElement[]) данный метод устанавливает товары в корзине
- set setAmount(summ: number) данный метод устанавливает итоговую сумму товаров в корзине
- public render() данный метод возвращает итоговую верстку корзины

#### Класс `Card`
Отображает карточку товара на главной странице и ее открытое состояние

```typescript
constructor(container: HTMLElement, protected events: IEvents)
```
**Параметры:**
в качестве параметров конструктор принимает темплейт корзины и брокер событий events

**Поля и методы:**
- setContent(data: IProduct)данный метод устанавливает данные карточки товара в верстку
- public render()данный метод возвращает итоговую верстку карточки 

#### Класс `Contacts`
Данный класс отображает форму с заполнением имени пользователя и номер телефона и наследует абстрактный класс `Form`

```typescript
constructor(container: HTMLFormElement, protected events: EventEmitter)
```
**Параметры:**
в качестве параметров конструктор принимает форму и брокер событий

**Поля и методы:**
- set setEmail(email: string) данный метод устанавливает почту пользователя, введенную в поле с почтой
- set setPhone(phone: string) данный метод устанавливает номер телефона пользователя, введенный в поле с номером телефона

#### Класс `Form`
Данный класс является абстрактным и родительским для класса Contacts и Order

```typescript
constructor(container: HTMLFormElement, protected events: IEvents)
```
**Параметры:**
- protected container: HTMLFormElement;
- protected submit: HTMLButtonElement

**Поля и методы:**
- public clear() данны метод реализует очистку данных в форме
- public render() данный метод возвращает итоговую верстку формы

#### Класс `Modal`
Данный класс отображает модальное окно приложения

```typescript
constructor(container: HTMLElement, events: IEvents)
```
**Параметры:**
В качестве параметра конструктор принимает темплейт с версткой модального окна

**Поля и методы:**
- setContent(value: HTMLElement) данный метод устанавливает контент в модальном окне
- public close() данный реализует закрытие модального окна 
- public open() данный метод реализует открытие модального окна
- public render(value: HTMLElement) данный метод возвращает итоговую верстку для отображение нужного модального окна

#### Класс `Order`
Данный класс отображает форму с выбором оплаты и полем ввода имени пользователя и наследует абстрактный класс `Form`

```typescript
constructor(container: HTMLFormElement, protected events: EventEmitter)
```
**Параметры:**
В качестве параметра конструктор принимает форму и брокер событий

**Поля и методы:**
- set setPayment(payment: orderType) данный метод устанавливает тип оплаты, который выбрал пользователь 
- set address(address: string) даный метод устанавливает адрес, введенный в поле ввода с адресом

#### Класс `Page`
Данный класс отображает всю страницу приложения

```typescript
constructor(container: HTMLElement, events: IEvents)
```
**Параметры:**
В качестве параметров принмает верстку страницы и брокер событий

**Поля и методы:**
set setCatalog(items: HTMLElement[]) данный метод устанавливает товары на главной странице
set setCount(items: HTMLElement[]) данный метод устанавливает количество товаров в корзине

#### Класс `Success`
Данный класс отображает итоговую стоимость заказа

```typescript
constructor(container: HTMLElement, protected events: IEvents)
```
**Параметры:**
В качестве параметров конструктор принимает верстку итогового заказа и брокер событий

**Поля и методы:**
- set setSum(order: IOrder) данный метод устанавливает сумму итогового заказа 
- public render() данный метод возвращает итоговую верстку с успешным заказом

## 🔄 Взаимодействие компонентов
1. Запуск приложения -> Отображение карточек товаров с помощью класса Card -> Вызов метода в классе AppState для обновления состояния карточек на странице с помощью метода setProduct -> после чего происходит обновление отображения с помощью брокера событий ↓

2. Нажатие на выбранную карточку и добавление в корзину -> Отображение карточки происходит с помощью класса Card -> Вызов встроенного события через брокер событий для сообщения об открытии карточки -> Обновление состояния в классе AppState ↓

3. Нажатие на кнопку в корзину -> Отображение корзины с помощью класса Basket -> Вызов события с помощью брокера событий для для обновления состояния корзины в классе AppState -> Отображение обновленных данных с помощью вызова брокера событий ↓

4. Отображение формы с выбором оплаты и полем ввода имени пользователя с помощью класса Order -> нажатие на выбор оплаты и заполнение поля с именем пользователя -> подтверждение формы в брокере событий и заполнение введенных данных ↓

5. Нажатие на кнопку далее -> Отображение формы с заполнением имени пользователя и номер телефона -> Заполнение номера телефона и почты -> подтверждение формы в брокере событий и заполнение введенных данных ↓

6. Нажатие на кнопку оплатить -> Отображение успешного заказа в классе Sucess -> передача данных с помощью брокера событий  

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

События для работы приложение

- Событие basket:open для открытия корзины 
- Событие card:open открытие карточки на главной странице
- Событие order:open открытие окна с формой заполнения заказа
- Событие order:submit отправка данных с формы заказа
- Событие contacts:submit отправка данных формы с контактными данными