import { NativeStorage } from 'ionic-native';
import { DishaddPage } from './../dishadd/dishadd';
import { Component } from '@angular/core';
import { NavController,ActionSheetController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,public  af: AngularFire,public navParams: NavParams) {
      this.dishes = af.database.list('/dishes');
      
  }
   showOptions(id, name,description,price,image,ingredients) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Borrar ',
          role: 'destructive',
          handler: () => {
            this.dishes.remove(id).then(success=>{
              actionSheet.dismiss();
            },
            err =>{
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





