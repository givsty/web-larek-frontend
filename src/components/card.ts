import { ICardItem } from "../types";
import { EventEmitter } from "./base/events";

export class Card {
  protected category: HTMLSpanElement;
  protected title: HTMLTitleElement;
  protected price: HTMLSpanElement;
  protected image: HTMLImageElement

  constructor(protected container: HTMLElement, protected events: EventEmitter
  ) {
    this.category = container.querySelector('.card__category')
    this.title = container.querySelector('.card__title')
    this.price = container.querySelector('.card__price')
    this.image = container.querySelector('.card__image')
  }

  render(data: ICardItem) {
    this.category.textContent = data.category
    this.title.textContent = data.title
    this.price.textContent = data.price.toString()
    this.image.textContent = data.image
    return this.container
  }
}
