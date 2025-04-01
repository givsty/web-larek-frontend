import { IAppState, ICardItem } from "../types";
import { EventEmitter, IEvents } from "./base/events";

export class AppState implements IAppState{
  items: ICardItem[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events
  }

  setItems(items: ICardItem[]) {
    this.items = items
    this.events.emit("items:change", this.items);
  }
  setBasketItems() {

  }
}
