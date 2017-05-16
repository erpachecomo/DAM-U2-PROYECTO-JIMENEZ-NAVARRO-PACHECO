import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EncodeDataPage} from './../encode-data/encode-data';

/*
  Generated class for the AdminPanel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-panel',
  templateUrl: 'admin-panel.html'
})
export class AdminPanelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPanelPage');
  }

  goToEncodeData(){
    let nav = this.navCtrl;
    nav.push(EncodeDataPage);
  }

}
