import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private storage: Storage) { }

  /**
   * Returns all the contacts
   */
  async getAllContacts() {
    const contacts: Contact[] = [];
    await this.storage.forEach((value) => {
      if (value.firstName !== undefined) {
        contacts.push(value);
      }
    });
    return contacts;
  }

  /**
   * Returns the contacts filtered by search term
   * @param searchTerm
   * @param contacts
   */
  filterContacts(searchTerm: string, contacts: Contact[]) {
    let filteredContacts: Contact[];
    filteredContacts = contacts.filter((contact) => {
      return (contact.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              contact.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              contact.notes.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              contact.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              contact.phone.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
    return filteredContacts;
  }

  /**
   * Adds a new contact
   * @param newContact
   */
  async addContact(newContact: Contact) {
    this.storage.set(this.getCompleteName(newContact), newContact).then(() =>
      console.log('Added new contact ', newContact)
    );
  }

  /**
   * Deletes a contact
   * @param contact
   */
  async deleteContact(contact: Contact) {
    this.storage.remove(this.getCompleteName(contact)).then(() =>
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

  /**
   * Returns the complete name of a contact
   * @param contact
   */
  getCompleteName(contact: Contact) {
    return contact.firstName + ' ' + contact.lastName;
  }

}
