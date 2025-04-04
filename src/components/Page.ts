import { ICardItem, IPage } from "../types";
import { IEvents } from "./base/events";
import { Modal } from "./Modal";

export class Page implements IPage{

  protected headerBasket: HTMLButtonElement;
  protected headerBasketCounter: HTMLSpanElement;
  protected gallery: HTMLMediaElement;
  protected catalog?: HTMLElement;
  protected basketItems: HTMLElement
  protected modal: HTMLElement
  protected modalTemplate: HTMLElement;
  protected container: HTMLElement
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    this.container = container
    this.events = events
    this.headerBasket = container.querySelector('.header__basket') as HTMLButtonElement
    this.catalog = container.querySelector('.gallery')
    this.headerBasketCounter = container.querySelector('.header__basket')
    this.headerBasket.addEventListener('click', ()=>{
      this.events.emit("basket:open")
    })
  }

  set setCatalog(items: HTMLElement[]) {
    this.catalog.replaceChildren(...items)
  }

  set setBasket(items: HTMLElement[]) {
    this.basketItems.replaceChildren(...items)
  }

}