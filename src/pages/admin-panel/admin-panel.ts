import { NativeStorage } from 'ionic-native';
import { AdminmenuPage } from './../adminmenu/adminmenu';
import { WelcomePage } from './../welcome/welcome';
import { AdminMenuPage } from './../admin-menu/admin-menu';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EncodeDataPage} from './../encode-data/encode-data';
import firebase from 'firebase';

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

  goToEncodeData(){
    let nav = this.navCtrl;
    nav.push(EncodeDataPage);
  }

  goToMenu(){
    let nav = this.navCtrl;
    nav.push(AdminmenuPage);
  }
  logout(){
    let nav=this.navCtrl;
    firebase.auth().signOut().then(function(){
          console.log("AdminPanelPage");
      NativeStorage.clear().then(function () {
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
