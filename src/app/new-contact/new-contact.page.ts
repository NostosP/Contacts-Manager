import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private contactService: ContactService,
              private alertController: AlertController,
              private navController: NavController) { }

  ngOnInit() {}

  /**
   * Goes to Home view
   */
  goHome() {
    this.navController.navigateBack('/home');
  }

  /**
   * Saves the info as a new contact
   */
  saveContact() {
    const newContact = new Contact(this.firstName, this.lastName, this.email, this.phone, this.notes);
    this.contactService.addContact(newContact).then(() => this.presentAlert());
  }

  /**
   * Tells the user the contact has been successfully saved
   */
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
