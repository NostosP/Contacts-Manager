import { Contact } from './../models/contact';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  originalContacts: Contact[];
  contacts: Contact[];
  searchTerm = '';
  orderValue = 'f';
  tagValue = 'All';

  constructor(public alertController: AlertController,
              public contactService: ContactService,
              private navController: NavController) {}

  ngOnInit(): void {
    this.contactService.getAllContacts()
      .then((contacts: Contact[]) => {
        this.originalContacts = contacts;
        this.contacts = contacts;
      });
  }

  /**
   * Filters contacts by search term and tag value
   */
  filterContacts() {
    this.contacts = this.contactService.filterContacts(this.searchTerm, this.originalContacts);
    if (this.tagValue !== 'All') {
      this.contacts = this.contacts.filter((contact: Contact) => {
        return contact.tag.includes(this.tagValue);
      });
    }
    this.orderContacts();
  }

  /**
   * Order contacts depending on the selected order option,
   * default is by first name
   */
  orderContacts() {
    switch (this.orderValue) {
      case 'f': {
        this.contacts.sort(this.compareByFirstName);
        break;
      }
      case 'l': {
        this.contacts.sort(this.compareByLastName);
        break;
      }
      case 'e': {
        this.contacts.sort(this.compareByEmail);
        break;
      }
      case 'p': {
        this.contacts.sort(this.compareByPhone);
        break;
      }
      default: {
        this.contacts.sort(this.compareByFirstName);
        break;
      }
    }
  }

  compareByFirstName(a: Contact, b: Contact) {
    if (a.firstName < b.firstName) {return -1; }
    if (a.firstName > b.firstName) {return 1; }
    return 0;
  }

  compareByLastName(a: Contact, b: Contact) {
    if (a.lastName < b.lastName) {return -1; }
    if (a.lastName > b.lastName) {return 1; }
    return 0;
  }

  compareByEmail(a: Contact, b: Contact) {
    if (a.email < b.email) {return -1; }
    if (a.email > b.email) {return 1; }
    return 0;
  }

  compareByPhone(a: Contact, b: Contact) {
    if (a.phone < b.phone) {return -1; }
    if (a.phone > b.phone) {return 1; }
    return 0;
  }

  /**
   * Goes to New-Contact view
   */
  goToNewContact() {
    this.navController.navigateRoot('new-contact');
  }

}
