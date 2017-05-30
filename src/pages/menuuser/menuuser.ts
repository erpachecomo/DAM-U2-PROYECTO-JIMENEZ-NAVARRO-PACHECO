import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DishesPage } from '../dishes/dishes'
import { DrinksPage } from '../drinks/drinks'
import { DessertsPage } from '../desserts/desserts'

/*
  Generated class for the Menuuser tabs.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'page-menuuser',
  templateUrl: 'menuuser.html'
})
export class MenuuserPage {

  tab1Root: any = DishesPage;
  tab2Root: any = DrinksPage;
  tab3Root: any = DessertsPage;

  constructor(public navCtrl: NavController) {
    
  }

}