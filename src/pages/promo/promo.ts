import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Promo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-promo',
  templateUrl: 'promo.html'
})
export class PromoPage {

  img:string;
  name: string;
  desc: string;
  price: string;
  ing: string[];
  html:string;
  constructor(public navCtrl: NavController, public params: NavParams) {
    //this.img = params.data.image;
    this.name = this.params.get('name');
    this.desc = this.params.get('description');
    this.price = this.params.get('price');
    this.img = this.params.get('image');
    this.ing = this.params.get('ingredients');

    
    this.html = "<button ion-button >Algo</button>";

  }


}
