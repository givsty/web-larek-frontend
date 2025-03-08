import { IOrder, payment } from "../types"
import { EventEmitter } from "./base/events";

export class Order implements IOrder{
  orderDataBuyer: Map<string, payment> = new Map()
  protected adress: string;
  protected payment: payment;
  constructor(protected events: EventEmitter, adress: string, payment: payment) {
    this.adress = adress
    this.payment = payment
  }
  public add() {
    this.orderDataBuyer.set(this.adress, this.payment)
    this._changed()
  } 
  protected _changed() {
		this.events.emit('order:change', { items: Array.from(this.orderDataBuyer.keys()) });
  }
}

export class OrderData extends Order {
  protected email: string;
  protected phone: string;
  constructor(protected events: EventEmitter, adress: string, payment: payment, email: string, phone: string) {
    super(events, adress, payment)
    this.email = email
    this.phone = phone
    super.add
  }
}
