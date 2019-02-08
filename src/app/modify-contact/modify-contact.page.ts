import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modify-contact',
  templateUrl: './modify-contact.page.html',
  styleUrls: ['./modify-contact.page.scss'],
})
export class ModifyContactPage implements OnInit {

  contactId = '';
  contact: Contact;
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  notes = '';
  tag: string[] = [];

  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private navController: NavController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(this.contactId).then((contact: Contact) => {
      this.contact = contact;
    });
  }

  /**
   * Go back to contact view
   */
  goContact() {
    this.navController.navigateBack('/contact/' + this.contactId);
  }

  /**
   * Saves the changes made to the contact
   */
  saveContact() {
    if (this.firstName === '') {
      this.firstName = this.contact.firstName;
    }
    if (this.lastName === '') {
      this.lastName = this.contact.lastName;
    }
    if (this.email === '') {
      this.email = this.contact.email;
    }
    if (this.phone === '') {
      this.phone = this.contact.phone;
    }
    if (this.notes === '') {
      this.notes = this.contact.notes;
    }
    if (this.tag.length === 0) {
      this.tag = this.contact.tag;
    }
    this.contactService.deleteContact(this.contactId).then(() => {
      const newContact = new Contact(this.firstName, this.lastName,
                                     this.email, this.phone, this.notes,
                                     this.tag);
      console.log('Modified Contact', newContact);
      this.contactService.addContact(newContact).then(() => {
          this.presentLoading().then(() =>
            this.navController.navigateRoot('/contact/' + newContact.completeName)
          );
        }
      );
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 500
    });
    return await loading.present();
  }

}
