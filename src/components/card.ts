import { ICardItem } from "../types";

export class Card {
  protected title: HTMLTitleElement;
  protected description: HTMLSpanElement;
  protected buy: HTMLButtonElement;
  protected image: HTMLImageElement;
  protected price: HTMLSpanElement;

  constructor(items: ICardItem) {
    this.title.textContent = items.title
    this.description.textContent = items.description
    this.image.src = items.image
    this.price.textContent = items.price.toString()
  }
}
