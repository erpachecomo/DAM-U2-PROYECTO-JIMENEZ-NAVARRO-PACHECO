import { NativeStorage } from 'ionic-native';
import { WelcomePage } from './../welcome/welcome';
import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }
  logout(){
    let nav=this.navCtrl;
    firebase.auth().signOut().then(function(){
              console.log("AdminPanelPage");
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
  abrirMenu(){
    this.navCtrl.setRoot(MenuPage);
  }

}
