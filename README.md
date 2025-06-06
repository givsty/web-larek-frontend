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
//Карточка Товара
export type categories =
	| 'другое'
	| 'софт-скилс'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type orderType = 'cash' | 'online'

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

export interface IOrderForm{
	address: string,
	payment: string,	
	email: string,
	phone: string
}

export interface IBasket {
	items: IBasketItem[];
	amount: number | null;
}

export interface IOrder extends IOrderForm {
	items: string[],
	total: number,
}

export interface IBasketItem {
	id: string;
	title: string;
	price: number | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>

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
- addProduct(item: IBasketItem) данный метод реализует добавление товара
- removeProduct(item: IBasketItem) данный метод реализует удаление товара
- getBasketItems() данный метод возвращает актуальное состояние товаров в корзине
- getAmount() данный метод возвращает актуальное состояние суммы товаров в корзине
- validateOrder() данный метод проверяет на валидацию поля ввода в форме
- setValidateOrder(field: keyof IOrderForm, value: string) данный метод устанавливает ошибки валидации 
- clearBasket() - данный метод очищает корзину 
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

#### Класс `Card`
Отображает карточку товара на главной странице и ее открытое состояние
```typescript

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

interface ICard {
	price: number | null;
	title: string;
	description?: string;
	category?: string;
	image?: string;
	id?: string;
}

interface IColors {
	[key: string]: string;
}

```
```typescript
constructor(container: HTMLElement, protected events: IEvents)
```
**Параметры:**
в качестве параметров конструктор принимает темплейт карточки и брокер событий events
**Поля и методы:**
- category(value: string) данный метод устанавливает категорию товара
- descriptions(value: string) данный метод устанавливает описание товара
- title(value: string) данный метод устанавливает заголовок товара
- image(value: string) данный метод устанавливает изображение товара
- price(value: string) данный метод устанавливает цену товара
- id(value: string) данный метод устанавилвает id товара

#### Класс `Form`
Данный класс является абстрактным и родительским для класса Contacts и Order

```typescript
constructor(container: HTMLFormElement, protected events: IEvents)
```
**Параметры:**
в качестве параметров конструктор принимает темплейт формы и брокер событий events
**Поля и методы:**
- protected onInputChange(field: keyof T, value: string)
- set valid(value: boolean)
- set errors(value: string)
- render(state: Partial<T> & IFormState) 

#### Класс `Modal`
Данный класс отображает модальное окно приложения

```typescript
constructor(container: HTMLElement, events: IEvents)
```
**Параметры:**
В качестве параметра конструктор принимает разметку модального окна и брокер событий

**Поля и методы:**
- setContent(value: HTMLElement) данный метод устанавливает контент в модальном окне
- close() данный реализует закрытие модального окна 
- open() данный метод реализует открытие модального окна
- render(value: HTMLElement) данный метод возвращает итоговую верстку для отображение нужного модального окна

#### Класс `Order`
Данный класс отображает форму с выбором оплаты и полем ввода имени пользователя и наследует абстрактный класс `Form`

```typescript
constructor(container: HTMLFormElement, protected events: EventEmitter)
```
**Параметры:**
В качестве параметра конструктор принимает форму и брокер событий

**Поля и методы:**
- set payment(payment: orderType) данный метод устанавливает тип оплаты, который выбрал пользователь 
- set address(address: string) даный метод устанавливает адрес, введенный в поле ввода с адресом

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
set locked(value: boolean) данный метод блокирует прокрутку страницы

#### Класс `Success`
Данный класс отображает итоговую стоимость заказа

```typescript
interface ISucessActions {
	onClick: (event: MouseEvent) => void;
}

interface ISucсess {
	total: string;
}

constructor(
	container: HTMLElement,
	protected events: IEvents,
	actions?: ISucessActions
)

```
**Параметры:**
В качестве параметров конструктор принимает верстку итогового заказа, блокер событий и обработчик событий

**Поля и методы:**
- set total(amount: string) данный метод устанавливает сумму итогового заказа 

#### Абстрактный класс `Component`
Абстрактный класс для компонентов приложения(базовый компонент)

```typescript
protected constructor(protected readonly container: HTMLElement) 

```
**Параметры:**
В качестве параметров конструктор принимает темплейт

**Поля и методы:**
- toggleClass(element: HTMLElement, className: string, force?: boolean)
- protected setText(element: HTMLElement, value: unknown) Установить текстовое содержимое
- setDisabled(element: HTMLElement, state: boolean) Сменить статус блокировки
- protected setHidden(element: HTMLElement) Скрыть
- protected setVisible(element: HTMLElement) Показать
- protected setImage(element: HTMLImageElement, src: string, alt?: string) Установить изображение с алтернативным текстом
- render(data?: Partial<T>) Вернуть корневой DOM-элемент

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
- Событие contacts:submit отправка данных формы с контактными данными
- Событие card:select: для выбранной карточки 
- Событие preview:changed для установки выбранной карточки
- Событие modal:open открытие модального окна
- Событие basket:change изменение корзины
- Событие formsErrorChange  
- Событие order.address.change изменение адреса в заказе
- Событие order:ready готовый заказ
- Событие contacts.email.change изменение почты в заказе
- Событие contacts.phone.change изменение телефона в заказе 
- Событие contacts:submit отправка формы