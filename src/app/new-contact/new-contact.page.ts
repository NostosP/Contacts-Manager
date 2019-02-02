import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact  } from '../models/contact';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {

  firstName: string;
  lastName: string;
  completeName: string;
  email: string;
  phone: string;
  notes: string;

  constructor(private contactsService: ContactsService,
              private alertController: AlertController,
              private navController: NavController) { }

  ngOnInit() {}

  goHome() {
    this.navController.navigateBack('/home');
  }

  saveContact() {
    const newContact = new Contact(this.firstName, this.lastName, this.email, this.phone, this.notes);
    this.contactsService.addContact(newContact);
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contact saved!',
      // message: 'This is an alert message.',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.navController.navigateRoot('/home');
        }
      }]
    });

    await alert.present();
  }

}
