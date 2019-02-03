import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  searchTerm = '';
  contacts: any = [];

  constructor(public alertController: AlertController,
              public contactService: ContactsService,
              private navController: NavController) {}

  ngOnInit(): void {
    this.setFilteredContacts();
  }

  setFilteredContacts() {
    this.contactService.filterContacts(this.searchTerm)
      .then((filteredContacts) => {
        this.contacts = filteredContacts;
      });
  }

  goToNewContact() {
    this.navController.navigateRoot('new-contact');
  }

}
