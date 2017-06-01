import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

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
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,af:AngularFire) {
    this.opinions=af.database.list("/opinions");
  }

  mark(key){
    let env=this;
    this.opinions.update(key,
      {
        seen:true
      }).then(success=>{
        env.showToast("Marcada como leída");
      },err=>{
        env.showToast("Error al marcarla, por favor vuelve a intentar.\nDetalle:"+err.message);


      });
  }
showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OpinionPage');
  }

}
