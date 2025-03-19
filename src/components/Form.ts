export abstract class Form {
  protected input: HTMLInputElement;
  protected email: string;
  protected phone: string;
  protected adress: string;
  constructor(container: HTMLInputElement){
    this.input = container
  }

  set setEmail(email: string) {
    this.email = email
  }

  set setPhone(phone: string) {
    this.phone = phone
  }

  set setAdress(adress: string) {
    this.adress = adress
  }
}