import { IOrderResult } from "../types"

export class Success{
  protected container: HTMLElement
  protected title: HTMLTitleElement
  protected descriptions: HTMLParagraphElement
  protected button: HTMLButtonElement
  constructor(container: HTMLElement) {
    this.container = container
    this.title = container.querySelector('.order-success__title')
    this.descriptions = container.querySelector('.order-success__description')
    this.button = container.querySelector('.button')
    this.button.addEventListener('click', ()=>{
      console.log('закрытие заказа')
    })
  }

  public render(item: IOrderResult) {
    this.descriptions.textContent = `Ваш заказ готов списано ${item.amount} синапсов`
  }
}