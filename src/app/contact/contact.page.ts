import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  title: string;
  contact: Contact;

  constructor(private route: ActivatedRoute,
              private navController: NavController,
              private contactService: ContactService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(this.title).then((contact) => {
      this.contact = contact;
    });
  }

  /**
   * Goes to Home view
   */
  goHome() {
    this.navController.navigateBack('/home');
  }

  /**
   * Deletes the current contact
   */
  async deleteContact() {
    this.contactService.deleteContact(this.title);
  }

  /**
   * Asks the user for deleting confirmation
   */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'Do you want to delete this contact?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteContact().then(() => this.navController.navigateRoot('/home'));
          },
        }
      ]
    });

    await alert.present();
  }

}
