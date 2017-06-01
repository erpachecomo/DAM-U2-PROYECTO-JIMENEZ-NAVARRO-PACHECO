import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

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
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,af:AngularFire) {
    this.opinions=af.database.list("/opinions");
  }

  sendOpinion(){
    let env = this;
    this.opinions.push(
      {
        title:this.title,
        text:this.text,
        seen:false
      }).then(success=>{
        env.showToast("Enviada exitosamente");
      },err=>{
        env.showToast("Error al enviar, por favor vuelve a intentar.\nDetalle:"+err.message)

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpinionPage');
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
