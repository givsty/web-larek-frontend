export abstract class Form {
  protected input: HTMLInputElement;
  protected email: string;
  protected phone: string;
  protected address: string;
  
  constructor(container: HTMLInputElement){
    this.input = container
  }

  set setEmail(email: string) {
    this.email = email
  }

  set setPhone(phone: string) {
    this.phone = phone
  }

  set setAddress(address: string) {
    this.address = address
  }
}