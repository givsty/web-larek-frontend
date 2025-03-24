export class Success {
  protected orderSuccessDescription: HTMLParagraphElement

  set setOrderPrice(price: number) {
    this.orderSuccessDescription = document.querySelector('.order-success__title')
    this.orderSuccessDescription.textContent = `Списано ${price} синапсов`
  }
}