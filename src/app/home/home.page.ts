import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  searchTerm = '';
  contacts: any = [];

  constructor(public alertController: AlertController,
              public contactService: ContactService,
              private navController: NavController) {}

  ngOnInit(): void {
    this.setFilteredContacts();
  }

  /**
   * Gets contacts filtered by the search term
   */
  setFilteredContacts() {
    this.contactService.filterContacts(this.searchTerm)
      .then((filteredContacts) => {
        this.contacts = filteredContacts;
      });
  }

  /**
   * Goes to New-Contact view
   */
  goToNewContact() {
    this.navController.navigateRoot('new-contact');
  }

}
