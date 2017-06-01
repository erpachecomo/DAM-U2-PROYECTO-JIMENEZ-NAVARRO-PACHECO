import { NativeStorage } from 'ionic-native';
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
  selector: 'page-admin-user',
  templateUrl: 'admin-user.html'
})
export class AdminUserPage {

users: FirebaseListObservable<any>;
  constructor(public toastCtrl:ToastController,public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,public  af: AngularFire,public navParams: NavParams) {
      this.users = af.database.list('/users');
      
  }
  showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }
   showOptions(id, email) {
      let env = this;
      let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Borrar ',
          role: 'destructive',
          handler: () => {
            this.users.remove(id).then(success=>{
              env.showToast("Borrado exitosamente");
              actionSheet.dismiss();

            },
            err =>{
              env.showToast("Error al borrar, por favor vuelve a intentar.\nDetalle:"+err.message)
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
    let env = this;
    console.log(key);
    console.log(state);
    this.users.update(key, {state:state}).then(
        (success)=>{
          if(state)
            env.showToast("Usuario activado correctamente.");
          else
            env.showToast("Usuario desactivado correctamente.");
          
        },error=>{
          env.showToast("Error al cambiar estado del usuario.\nDetalle:"+error.message)
        });
    //firebase.auth()
    //this.users.remove(uid).then();
  }
addUser(){
  let env = this;
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
                  }).then(success=>{
                    env.showToast("Usuario registrado correctamente.");                    
                  },err=>{
                    env.showToast("Error al registrar el usuario.\nDetalle: "+err.message);                    
                  });
            },err=>{
              env.showToast("Error al registrar el usuario.\nDetalle: "+err.message);
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





