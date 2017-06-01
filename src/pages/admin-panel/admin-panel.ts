import { AdminOpinionPage } from './../admin-opinion/admin-opinion';
import { NativeStorage } from 'ionic-native';
import { AdminmenuPage } from './../adminmenu/adminmenu';
import { WelcomePage } from './../welcome/welcome';
import { AdminMenuPage } from './../admin-menu/admin-menu';
import { AdminUserPage } from './../admin-user/admin-user';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {}

  goToEncodeData(){
    let nav = this.navCtrl;
    nav.push(EncodeDataPage);
  }
showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }
  goToMenu(){
    let nav = this.navCtrl;
    nav.push(AdminmenuPage);
  }

goToOpinion(){
    let nav = this.navCtrl;
    nav.push(AdminOpinionPage);
  }

  goToUser(){
    let nav = this.navCtrl;
    nav.push(AdminUserPage);
  }
  logout(){
    let nav=this.navCtrl;
    let env=this;
    firebase.auth().signOut().then(function(){
          console.log("AdminPanelPage");
      NativeStorage.clear().then(function () {
          console.log("HOMEPAGE");
          nav.setRoot(WelcomePage);
        }, function (error) {
                        env.showToast("Error al borrar, por favor vuelve a intentar.\nDetalle:"+JSON.stringify(error));
          console.log(JSON.stringify(error));
        });
    }, function (error) {
      env.showToast("Error al borrar, por favor vuelve a intentar.\nDetalle:"+JSON.stringify(error));
      console.log(JSON.stringify(error));
    
    });
  }
}
