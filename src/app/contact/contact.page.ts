import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Contact } from '../models/contact';
import { ContactsService } from '../services/contacts.service';

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
              private contactService: ContactsService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(this.title).then((contact) => {
      this.contact = contact;
    });
  }

  goHome() {
    this.navController.navigateBack('/home');
  }

  async deleteContact() {
    this.contactService.deleteContact(this.title);
  }

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
