import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  title: string;

  constructor(private route: ActivatedRoute,
              private navController: NavController) { }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('id');
  }

  goHome() {
    this.navController.navigateBack('/home');
  }

}
