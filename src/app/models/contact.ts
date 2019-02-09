export class Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  tag: string[];

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.notes = '';
    this.tag = [];
  }

}
