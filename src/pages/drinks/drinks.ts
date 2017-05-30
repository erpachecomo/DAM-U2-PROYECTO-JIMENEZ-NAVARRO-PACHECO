import { PromoPage } from './../promo/promo';
import { Component } from '@angular/core';
import { NavController,ActionSheetController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-drinks',
  templateUrl: 'drinks.html'
})
export class DrinksPage {
drinks: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,public af: AngularFire,public navParams: NavParams) {
      this.drinks = af.database.list('/drinks');
  }
  showOptions(key, name,description,price,image,ingredients){
        this.navCtrl.push(PromoPage, {
          name:name,
          description:description,
          price:price,
          image:image,
          ingredients:ingredients
        });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
          this.drinks = this.af.database.list('/drinks');
  }

}

