import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


/*
  Generated class for the Menu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
dishes: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, af: AngularFire,public navParams: NavParams) {
      this.dishes = af.database.list('/dishes');
  }
addDish(){
  let prompt = this.alertCtrl.create({
    title: 'Nombre del platillo',
    message: "Ingresa el nombre del platillo",
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Guardar',
        handler: data => {
          this.dishes.push({
            name: data.name
          });
        }
      }
    ]
  });
  prompt.present();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
