export class Contact {
  firstName = '';
  lastName = '';
  completeName = '';
  email = '';
  phone = '';
  notes = '';
  tag: string[] = [];

  constructor(firstName: string, lastName: string, email: string,
              phone: string, notes: string, tag: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.completeName = firstName + ' ' + lastName;
    this.email = email;
    this.phone = phone;
    this.notes = notes;
    this.tag = tag;
  }

}
