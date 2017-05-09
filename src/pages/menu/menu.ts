import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';


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
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
  }
/*addDish(){
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
}*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
