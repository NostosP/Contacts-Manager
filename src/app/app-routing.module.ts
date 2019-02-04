import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'contact/:id', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'new-contact', loadChildren: './new-contact/new-contact.module#NewContactPageModule' },
  { path: 'modify-contact/:id', loadChildren: './modify-contact/modify-contact.module#ModifyContactPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
