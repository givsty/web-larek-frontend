import { ICardItem, IPage } from "../types";

export class Page implements IPage{
  protected headerBasket: HTMLButtonElement;
  protected headerBasketCounter: HTMLSpanElement;
  protected gallery: HTMLMediaElement;
  protected catalog?: HTMLElement;
  constructor(protected container: HTMLElement) {
    this.headerBasket = container.querySelector('.header__basket')
    this.catalog = container.querySelector('.gallery')
    this.headerBasket.addEventListener('click', ()=>{
      console.log('открыть корзину')
    })
  }

  set setCatalog(items: HTMLElement[]) {
    this.catalog.replaceChildren(...items)
  }
}