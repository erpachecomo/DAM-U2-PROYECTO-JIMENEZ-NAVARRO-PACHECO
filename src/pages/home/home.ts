import { NativeStorage } from 'ionic-native';
import { WelcomePage } from './../welcome/welcome';
import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  options: BarcodeScannerOptions;
  results: any = {};
  constructor(public navCtrl: NavController,private barcode: BarcodeScanner) {

  }
  logout() {
    let nav = this.navCtrl;
    firebase.auth().signOut().then(function () {
      console.log("AdminPanelPage");
      NativeStorage.setItem('user',
        {
          name: ""
        })
        .then(function () {
          console.log("HOMEPAGE");
          nav.setRoot(WelcomePage);
        }, function (error) {
          console.log(JSON.stringify(error));
        });
    }, function (error) {
      console.log(JSON.stringify(error));
    });
  }
  abrirMenu() {
    this.navCtrl.setRoot(MenuPage);
  }
  abrirCuenta() {
    this.options = {
      prompt: 'Escanea un código para ver los resultados'
    }

    this.results = this.barcode.scan();
  }
}
