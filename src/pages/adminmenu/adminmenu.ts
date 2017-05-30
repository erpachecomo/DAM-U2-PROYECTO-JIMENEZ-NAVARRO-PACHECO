import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdminDishesPage } from '../admin-dishes/admin-dishes'
import { AdminDrinksPage } from '../admin-drinks/admin-drinks'
import { AdminDessertsPage } from '../admin-desserts/admin-desserts'

/*
  Generated class for the Adminmenu tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-adminmenu',
  templateUrl: 'adminmenu.html'
})
export class AdminmenuPage {

  tab1Root: any = AdminDishesPage;
  tab2Root: any = AdminDrinksPage;
  tab3Root: any = AdminDessertsPage;

  constructor(public navCtrl: NavController) {

  }

}