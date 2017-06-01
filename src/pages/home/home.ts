import { OpinionPage } from './../opinion/opinion';
import { MenuuserPage } from './../menuuser/menuuser';
import { NativeStorage } from 'ionic-native';
import { WelcomePage } from './../welcome/welcome';
import { BillPage } from './../bill/bill';
import { BookPage } from './../book/book';
import { PromoPage } from './../promo/promo';
import { Component } from '@angular/core';
import { NavController, Alert, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  options: BarcodeScannerOptions;
  results: any = {};
  res: any;
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, private barcode: BarcodeScanner) {

  }
  
  logout() {
    let env=this;
    let nav = this.navCtrl;
    
    firebase.auth().signOut().then(function () {
      console.log("AdminPanelPage");
      NativeStorage.clear().then(function () {
          console.log("HOMEPAGE");
          nav.setRoot(WelcomePage);
        }, function (error) {
          env.showToast("Error al intentar salir, por favor vuelve a intentar.\nDetalle:"+JSON.stringify(error));
          console.log(JSON.stringify(error));
        });
    }, function (error) {
          env.showToast("Error al intentar salir, por favor vuelve a intentar.\nDetalle: "+(error.message));      
      console.log(JSON.stringify(error));
    });
  }
  abrirMenu() {
    this.navCtrl.push(MenuuserPage);
  }//abrirMenu
  abrirOpinion() {
    this.navCtrl.push(OpinionPage);
  }//abrirMenu


  async  abrirCuenta() {
    this.options = {
      prompt: 'Escanea un código para ver los resultados'
    }

    this.results = await this.barcode.scan();
    let receta: any = this.results.text;
    this.navCtrl.push(PromoPage, JSON.parse(receta));

  }//abrirCuenta
  abrirReservacion() {
    this.navCtrl.push(BookPage);
  }
  showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }
}

