import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
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
  selector: 'page-admin-dishes',
  templateUrl: 'admin-dishes.html'
})
export class AdminDishesPage {

dishes: FirebaseListObservable<any>;
options: BarcodeScannerOptions;
  results: any = {};
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, private barcode: BarcodeScanner,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,public  af: AngularFire,public navParams: NavParams) {
      this.dishes = af.database.list('/dishes');
      
  }
  async encodeData(dish){
    const result = await this.barcode.encode(this.barcode.Encode.TEXT_TYPE,dish);
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
            this.dishes.remove(id).then(success=>{
              env.showToast("Borrado exitosamente");
              actionSheet.dismiss();
            },
            err =>{
              env.showToast("Error al borrar, por favor vuelve a intentar.\nDetalle:"+err.message);
              console.log("Borrando :()"+JSON.stringify(err));
            });
          }
        },
        {
          text: 'Seleccionar como platillo del día ',
          handler: () => {
            this.encodeData(JSON.stringify({id:id,
                price:price,
                description:description,
                name:name,
                image:image,
                ingredients:ingredients}));
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
                type:'dishes'                
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
    showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }
addDish(){
  this.navCtrl.push(DishaddPage,{
                id:null,
                type:'dishes'
              });
    
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.dishes = this.af.database.list('/dishes');
  }

}





