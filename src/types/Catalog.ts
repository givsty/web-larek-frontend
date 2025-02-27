import { EventEmitter } from '../components/base/events';
import { ICardApi } from './index';

export class CatalogView {
	protected image: HTMLImageElement;
  protected category: HTMLElement;
	protected title: HTMLElement;
	protected price: HTMLElement;
  constructor(protected container: HTMLElement, protected events: EventEmitter) {

  }
  render(data?: object): HTMLElement {
    return this.container
  }
}
