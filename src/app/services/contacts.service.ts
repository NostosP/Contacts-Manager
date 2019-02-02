import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts = [
    {
      firstName: 'Alberto',
      lastName: 'Paruta',
      completeName: 'Alberto Paruta',
      email: 'asd@gmail.com',
      phone: '123',
      notes: 'lorem ipsum'
    }
  ];

  constructor() { }

  filterContacts(searchTerm: string) {
    return this.contacts.filter((contact) => {
        return contact.completeName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  addContact(newContact: Contact) {
    this.contacts.push(newContact);
  }

}
