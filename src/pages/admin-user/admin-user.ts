import { NativeStorage } from 'ionic-native';
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
  selector: 'page-admin-user',
  templateUrl: 'admin-user.html'
})
export class AdminUserPage {

users: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,public  af: AngularFire,public navParams: NavParams) {
      this.users = af.database.list('/users');
      
  }
   showOptions(id, email) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Borrar ',
          role: 'destructive',
          handler: () => {
            this.users.remove(id).then(success=>{
              actionSheet.dismiss();
            },
            err =>{
              console.log("Borrando :()"+JSON.stringify(err));
            });
          }
        },{
          text: 'Actualizar usuario',
          handler: () => {

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
//    actionSheet.present();
  }
  userSelected(key,state){
    console.log(key);
    console.log(state);
    this.users.update(key, {state:state}).then(
        (success)=>{
          
        });
    //firebase.auth()
    //this.users.remove(uid).then();
  }
addUser(){
   let prompt = this.alertCtrl.create({
      title: 'Agregar un administrador',
      message: "Inserta un correo",
      inputs: [
        {
          name: 'email',
          placeholder: 'Correo electronico'
        },
        {
          name: 'password',
          placeholder: 'Contraseña'
        },
      ],
      buttons: [
        {
          text: 'Registrar',
          handler: data => {
            firebase.auth().createUserWithEmailAndPassword(data.email,data.password).then(success=>{
                console.log("Registrado!  "+JSON.stringify(success));
                this.users.push(
                  {
                    user:data.email,
                    state:true,
                    uid:success.uid
                  }).then();
            },err=>{
              console.log("NO Registrado!  "+JSON.stringify(err));
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();  
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.users = this.af.database.list('/users');
  }

}





