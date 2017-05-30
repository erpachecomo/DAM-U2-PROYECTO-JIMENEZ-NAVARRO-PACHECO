import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Opinion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-opinion',
  templateUrl: 'opinion.html'
})
export class OpinionPage {
  title:string;
  text:string;
opinions:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,af:AngularFire) {
    this.opinions=af.database.list("/opinions");
  }

  sendOpinion(){
    this.opinions.push(
      {
        title:this.title,
        text:this.text,
        seen:false
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpinionPage');
  }

}
