import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/*
  Generated class for the EncodeData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-encode-data',
  templateUrl: 'encode-data.html'
})
export class EncodeDataPage {
options: BarcodeScannerOptions;
  results: any = {};
  cadenita:string="";
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, private barcode: BarcodeScanner) {

  }
showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }
async encodeData(){
  const result = await this.barcode.encode(this.barcode.Encode.TEXT_TYPE,this.cadenita);
}

}
