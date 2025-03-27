import { ICardItem, IPage } from "../types";
import { IEvents } from "./base/events";
import { Modal } from "./Modal";

export class Page implements IPage{

  protected headerBasket: HTMLButtonElement;
  protected headerBasketCounter: HTMLSpanElement;
  protected gallery: HTMLMediaElement;
  protected catalog?: HTMLElement;
  protected modal: HTMLElement
  protected modalTemplate: HTMLElement;
  protected container: HTMLElement
  protected events: IEvents;
  constructor(container: HTMLElement) {
    this.container = container
    this.headerBasket = container.querySelector('.header__basket')
    this.catalog = container.querySelector('.gallery')
    this.headerBasketCounter = container.querySelector('.header__basket')
  }

  setModal(content: HTMLElement) {
    this.modalTemplate = content
    const modal = new Modal(this.container, this.modalTemplate)
    this.headerBasket.addEventListener('click', ()=>{
      this.events.emit('basket:open')
    })
  }

  set setCatalog(items: HTMLElement[]) {
    this.catalog.replaceChildren(...items)
  }
}