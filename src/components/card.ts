import { ICardItem } from "../types";
import { EventEmitter } from "./base/events";

export class Card{
  protected category: HTMLSpanElement;
  protected title: HTMLTitleElement;
  protected price: HTMLSpanElement;
  protected image: HTMLImageElement
  protected container: HTMLElement;
  protected events:EventEmitter
  protected description?: HTMLParagraphElement | null

  constructor(container: HTMLElement, events: EventEmitter) {
    this.container = container
    this.events = events
    this.category = container.querySelector('.card__category')
    this.title = container.querySelector('.card__title')
    this.price = container.querySelector('.card__price')
    this.image = container.querySelector('.card__image')
  }

  public render(data: ICardItem) {
    this.category.textContent = data.category
    this.title.textContent = data.title
    this.price.textContent = data.price.toString()
    this.image.textContent = data.image
    this.description.textContent = data.description

    return this.container
  }
}

export class CardView extends Card{
  protected buyButton: HTMLButtonElement;
  constructor(container: HTMLElement, events: EventEmitter){
    super(container, events)
    this.buyButton = container.querySelector('.card__button')
    this.description = container.querySelector('.card__text')
    super.render
  }
}
