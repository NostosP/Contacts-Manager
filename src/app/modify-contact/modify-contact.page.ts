import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { NavController } from '@ionic/angular';

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
              private navController: NavController) { }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(this.contactId).then((contact: Contact) => {
      this.contact = contact;
    });
  }

  /**
   * Saves the changes
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
      console.log('First tag', this.tag);
      this.tag = this.contact.tag;
      console.log('Second tag', this.tag);
    }
    this.contactService.deleteContact(this.contactId).then(() => {
      const newContact = new Contact(this.firstName, this.lastName,
                                     this.email, this.phone, this.notes,
                                     this.tag);
      console.log('Modified Contact', newContact);
      this.contactService.addContact(newContact).then(() =>
        this.navController.navigateBack('/contact/' + newContact.completeName)
      );
    });
  }

}
