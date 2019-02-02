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
  contacts: any;

  constructor(public alertController: AlertController,
              public contactService: ContactsService,
              private navController: NavController) {}

  ngOnInit(): void {
    this.setFilteredContacts();
  }

  setFilteredContacts() {
    this.contacts = this.contactService.filterContacts(this.searchTerm);
  }

  goToNewContact() {
    this.navController.navigateRoot('new-contact');
  }

  async delete(name: string) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Do you want to eliminate <strong>' + name + '</strong> from your contact list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
