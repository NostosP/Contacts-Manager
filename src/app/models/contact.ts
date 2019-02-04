export class Contact {
  firstName: string;
  lastName: string;
  completeName: string;
  email: string;
  phone: string;
  notes: string;
  tag: string[];

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

  setFirstName(newFirstName: string) {
    this.firstName = newFirstName;
    this.completeName = newFirstName + ' ' + this.lastName;
  }

  setLastName(newLastName: string) {
    this.lastName = newLastName;
    this.completeName = this.firstName + ' ' + newLastName;
  }

}
