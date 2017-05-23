import { NativeStorage } from 'ionic-native';
import { WelcomePage } from './../welcome/welcome';
import { DishaddPage } from './../dishadd/dishadd';
import { Component } from '@angular/core';
import {ModalController, NavController,ActionSheetController, NavParams, AlertController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the AdminMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-menu',
  templateUrl: 'admin-menu.html'
})
export class AdminMenuPage {
dishes: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, af: AngularFire,public navParams: NavParams,public modalCtrl: ModalController) {
      this.dishes = af.database.list('/dishes');
  }
   showOptions(id, name,description,price,image) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Borrar ',
          role: 'destructive',
          handler: () => {
            //this.removeSong(songId);
          }
        },{
          text: 'Actualizar platillo',
          handler: () => {
              let modal = this.modalCtrl.create(DishaddPage,{
                id:id,
                price:price,
                description:description,
                name:name,
                image:image
              });
              modal.present().then(data=>{
                console.log(data);
              },
              data=>{
                console.log(data);
              });
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
addDish(){
  let modal = this.modalCtrl.create(DishaddPage,{id:null});
    modal.present().then(data=>{
      console.log(data);
    },
    data=>{
      console.log(data);
    });
    
    /*let prompt = this.alertCtrl.create({
    title: 'Nombre del platillo',
    message: "Ingresa el nombre del platillo",
    inputs: [
      {
        name: 'name',
        placeholder: 'Nombre'
      },
      {
        name: 'description',
        placeholder: 'Descripción'
      },
      {
        name: 'price',
        placeholder: 'Precio',
        type:'number'
      },
      {
        name: 'image',
        placeholder: 'Imagen',
        type:'number'
      }
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
          console.log("Guardando...");
          console.log(JSON.stringify(data));
          this.dishes.push({
            name: data.name,
            description: data.description,
            price: data.price
            
          });
        }
      }
    ]
  });
  prompt.present();*/
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
