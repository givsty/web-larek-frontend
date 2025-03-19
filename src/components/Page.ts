import { ICardItem, IPage } from "../types";

export class Page implements IPage{
  protected headerBasket: HTMLButtonElement;
  protected headerBasketCounter: HTMLSpanElement;
  protected gallery: HTMLMediaElement;
  constructor() {
    this.headerBasket = document.querySelector('.header__basket')
    this.gallery = document.querySelector('.gallery')
  }

}
