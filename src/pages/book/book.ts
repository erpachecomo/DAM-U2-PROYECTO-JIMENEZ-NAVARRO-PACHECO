import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/*
  Generated class for the Book page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
  
})
export class BookPage {
  birtday:any;
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,public call:CallNumber) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }
async callNumber():Promise<any>{
  try {
    await this.call.callNumber("3111126818",true);
  } catch (e) {
    this.showToast("Error al intentar realizar la llamada. "+JSON.stringify(e));
    console.error(e);
  }
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
