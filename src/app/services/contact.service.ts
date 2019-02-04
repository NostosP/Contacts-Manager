import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private storage: Storage) { }

  /**
   * Returns contacts filtered by the search term
   * @param searchTerm
   */
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

  /**
   * Adds a new contact to the list
   * @param newContact
   */
  async addContact(newContact: Contact) {
    this.storage.set(newContact.completeName, newContact).then(() =>
      console.log('Added new contact ', newContact.completeName)
    );
  }

  /**
   * Deletes a contact from the list
   * @param contact
   */
  async deleteContact(contact: string) {
    this.storage.remove(contact).then(() =>
      console.log('Deleted contact ', contact)
    );
  }

  /**
   * Returns info about the contact associated with the key
   * @param key
   */
  getContact(key: string) {
    return this.storage.get(key);
  }

}
