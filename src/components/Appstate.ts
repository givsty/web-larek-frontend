import { IAppState, IProduct } from "../types";
import { EventEmitter, IEvents } from "./base/events";

export class AppState {
  items: IProduct[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events
  }

  setItems(items: IProduct[]) {
    this.items = items
    this.events.emit("items:change", this.items);
  }
  setBasketItems(){
    
  }
}
