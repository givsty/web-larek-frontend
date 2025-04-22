import { IAppState, ICardCatalog } from "../types";
import { EventEmitter, IEvents } from "./base/events";

export class AppState {
  items: ICardCatalog[];
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events
  }

  setItems(items: ICardCatalog[]) {
    this.items = items
    this.events.emit("items:change", this.items);
  }

}
