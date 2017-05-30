import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Bill page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html'
})
export class BillPage {
  img:string;
  name: string;
  desc: string;
  price: string;
  constructor(public navCtrl: NavController, public params: NavParams) {
    //this.img = params.data.image;
    this.name = this.params.get('name');
    this.desc = this.params.get('description');
    this.price = this.params.get('price');
    this.img = this.params.get('image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPage');
  }

}
