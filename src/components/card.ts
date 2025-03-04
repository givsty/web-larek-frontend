import { ICardItem } from "../types";

export class Card {
  protected price: HTMLSpanElement;
  protected title: HTMLTitleElement;
  protected buy: HTMLButtonElement;
  protected image?: HTMLImageElement;
  protected description?: HTMLSpanElement;

  constructor(items: ICardItem) {
    this.title.textContent = items.title
    this.description.textContent = items.description
    this.image.src = items.image
    this.price.textContent = items.price.toString()
  }
}
