import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Opinion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-opinion',
  templateUrl: 'admin-opinion.html'
})
export class AdminOpinionPage {

opinions:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,af:AngularFire) {
    this.opinions=af.database.list("/opinions");
  }

  mark(key){
    this.opinions.update(key,
      {
        seen:true
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpinionPage');
  }

}
