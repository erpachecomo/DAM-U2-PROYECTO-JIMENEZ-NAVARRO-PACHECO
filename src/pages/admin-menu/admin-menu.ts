import { NativeStorage } from 'ionic-native';
import { WelcomePage } from './../welcome/welcome';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AdminMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-menu',
  templateUrl: 'admin-menu.html'
})
export class AdminMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
logout(){
    let nav=this.navCtrl;
    firebase.auth().signOut().then(function(){
              NativeStorage.setItem('user',
        {
          name: ""
        })
        .then(function(){
          console.log("HOMEPAGE");
          nav.setRoot(WelcomePage);
        }, function (error) {
          console.log(JSON.stringify(error));
        });
            }, function (error) {
              console.log(JSON.stringify(error));
          });
  }

}
