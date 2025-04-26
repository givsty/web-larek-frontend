import { IAppState, IBasketItem, IProduct } from "../types";
import { EventEmitter, IEvents } from "./base/events";

export class AppState implements AppState{
  items: IProduct[];
  basketItems: IBasketItem[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events
  }

  setItems(items: IProduct[]) {
    this.items = items
    this.events.emit("items:change", this.items);
  }
  
  setBasketItems(items: IBasketItem[]){
    this.basketItems = items
    this.events.emit("basket:change", this.items)
  }

}
