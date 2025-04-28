import { EventEmitter, IEvents } from "./base/events"

export abstract class Form {
  protected form: HTMLFormElement
  constructor(container: HTMLFormElement, protected events: IEvents){
    this.form = container
    this.form.addEventListener("submit", ()=>{
      this.events.emit('form:submit')
    })
  }

  set setEmail(email: string) {
  }

  set setPhone(phone: string) {
  }

  set setAddress(address: string) {
  }
}