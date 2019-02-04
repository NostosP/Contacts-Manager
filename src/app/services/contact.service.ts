import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private storage: Storage) { }

  async filterContacts(searchTerm: string) {
    const contacts: Contact[] = [];
    let filteredContacts;
    await this.storage.forEach((value) => {
      if (value.firstName !== undefined) {
        contacts.push(value);
      }
    }).then(() => {
      filteredContacts = contacts.filter((contact) => {
        return contact.completeName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    });
    return filteredContacts;
  }

  async addContact(newContact: Contact) {
    this.storage.set(newContact.completeName, newContact).then(() =>
      console.log('Added new contact ', newContact.completeName)
    );
  }

  async deleteContact(contact: string) {
    this.storage.remove(contact).then(() =>
      console.log('Deleted contact ', contact)
    );
  }

  getContact(key: string) {
    return this.storage.get(key);
  }

}
