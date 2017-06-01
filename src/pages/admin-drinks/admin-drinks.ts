import { NativeStorage } from 'ionic-native';
import { DishaddPage } from './../dishadd/dishadd';
import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';


/*
  Generated class for the AdminMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-admin-drinks',
  templateUrl: 'admin-drinks.html'
})
export class AdminDrinksPage {
drinks: FirebaseListObservable<any>;
  constructor(public toastCtrl:ToastController,public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,public  af: AngularFire,public navParams: NavParams) {
      this.drinks = af.database.list('/drinks');
      
  }
  showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }
   showOptions(id, name,description,price,image,ingredients) {
      let env = this;
      let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Borrar ',
          role: 'destructive',
          handler: () => {
            this.drinks.remove(id).then(success=>{
              env.showToast("Borrado exitosamente");
              actionSheet.dismiss();
            },
            err =>{
              env.showToast("Error al borrar, por favor vuelve a intentar.\nDetalle:"+err.message)
              console.log("Borrando :()"+JSON.stringify(err));
            });
          }
        },{
          text: 'Actualizar platillo',
          handler: () => {
            this.navCtrl.push(DishaddPage,{
                id:id,
                price:price,
                description:description,
                name:name,
                image:image,
                ingredients:ingredients,
                type:'drinks'                
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
addDrink(){
  this.navCtrl.push(DishaddPage,{
                id:null,
                type:'drinks'
              });
    
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.drinks = this.af.database.list('/drinks');
  }

}
