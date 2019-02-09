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

  contact: Contact;
  tempContact: Contact;
  name = '';
  placeholderFN = 'First Name';
  placeholderLN = 'Last Name';
  placeholderE = 'Email';
  placeholderP = 'Phone';
  placeholderN = 'Enter more information here...';
  placeholderT = [];

  constructor(private route: ActivatedRoute,
              private contactService: ContactService,
              private navController: NavController,
              private loadingCtrl: LoadingController) {
    this.contact = new Contact();
    this.tempContact = new Contact();
  }

  ngOnInit() {
    this.contactService.getContact(this.route.snapshot.paramMap.get('id'))
      .then((contact: Contact) => {
        this.contact = contact;
        this.name = this.contactService.getCompleteName(contact);
        if (contact.firstName !== '') {this.placeholderFN = contact.firstName; }
        if (contact.lastName !== '') {this.placeholderLN = contact.lastName; }
        if (contact.email !== '') {this.placeholderE = contact.email; }
        if (contact.phone !== '') {this.placeholderP = contact.phone; }
        if (contact.notes !== '') {this.placeholderN = contact.notes; }
      });
  }

  /**
   * Go back to contact view
   */
  goContact() {
    this.navController.navigateBack('/contact/' + this.name);
  }

  /**
   * Saves the changes made to the contact
   */
  saveContact() {
    if (this.tempContact.firstName === '') {
      this.tempContact.firstName = this.contact.firstName;
    }
    if (this.tempContact.lastName === '') {
      this.tempContact.lastName = this.contact.lastName;
    }
    if (this.tempContact.email === '') {
      this.tempContact.email = this.contact.email;
    }
    if (this.tempContact.phone === '') {
      this.tempContact.phone = this.contact.phone;
    }
    if (this.tempContact.notes === '') {
      this.tempContact.notes = this.contact.notes;
    }
    if (this.tempContact.tag.length === 0) {
      this.tempContact.tag = this.contact.tag;
    }
    this.contactService.deleteContact(this.contact).then(() => {
      this.contactService.addContact(this.tempContact).then(() => {
          this.presentLoading().then(() =>
            this.navController.navigateRoot('/contact/'
            + this.contactService.getCompleteName(this.tempContact))
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
