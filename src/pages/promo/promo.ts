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

  img: string;
  name: string;
  desc: string;
  price: string;
  ing: string[];
  num: number;


  constructor(public navCtrl: NavController, public params: NavParams) {
    //this.img = params.data.image;
    this.name = this.params.get('name');
    this.desc = this.params.get('description');
    //this.price = this.formatNumber.new(this.params.get('price'),"$");
    let algo:number = parseInt(this.params.get('price'));
     this.price = '$' + algo.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    this.img = this.params.get('image');
    this.ing = this.params.get('ingredients');


  }


}
