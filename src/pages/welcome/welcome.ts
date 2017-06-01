import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { HomePage } from './../home/home';
import { AdminPanelPage} from './../admin-panel/admin-panel';
import { Component } from '@angular/core';
import {ToastController, NavController,LoadingController } from 'ionic-angular';
//import { NativeStorage,GooglePlus } from 'ionic-native';
//import { Facebook } from '@ionic-native/facebook';
import {Facebook, NativeStorage, GooglePlus } from 'ionic-native';
import firebase from 'firebase';




/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  userProfile: any = null;
  users:FirebaseListObservable<any>;
  email:string='erpachecomo@ittepic.edu.mx';
  password:string='poktli123';
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, af:AngularFire, private facebook:Facebook, public loadingCtrl:LoadingController) {
        this.users = af.database.list('/users');

  }
  continue(){
    let nav = this.navCtrl;
    let env = this;
    firebase.auth().signInAnonymously().then(success=>{
        NativeStorage.setItem('user',
        {
          name: "invitado"
        })
        .then(function(){
          console.log("Invitado");
          nav.setRoot(HomePage);
        }, function (err) {
          env.showToast(JSON.stringify(err));
          console.log("NativeStorage Invitado: "+JSON.stringify(err));

        });
    },err=>{
      env.showToast(err.message);
         console.log("NativeStorage Invitado: "+JSON.stringify(err));
    });
     
  }
continueAsAdmin(){
  let nav = this.navCtrl;
  let env = this;
  firebase.auth().signInWithEmailAndPassword(this.email, this.password).
  then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            this.users.forEach(element => {
              
              for(let i =0;i<element.length;i++)
              if(element[i].state&&element[i].uid===this.userProfile.uid){
                NativeStorage.setItem('admin',
            {
              name: this.userProfile.displayName,
              picture: this.userProfile.photoURL
            })
            .then(function(){
              console.log("AdminPanelPage");
              nav.setRoot(AdminPanelPage);
            }, function (error) {
              env.showToast(JSON.stringify(error));
              console.log(JSON.stringify(error));
          });
              }

            });
            
        },error=>{
              env.showToast("Usuario y/o contraseña incorrecta");
              console.log(JSON.stringify(error));
        });
}

doFbLogin(){
  let env = this;
  let nav = this.navCtrl;
  Facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)                                                                                                            
        .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            NativeStorage.setItem('user',
            {
              name: this.userProfile.displayName,
              picture: this.userProfile.photoURL
            })
            .then(function(){
              console.log("HOMEPAGE");
              nav.setRoot(HomePage);
            }, function (error) {
              env.showToast(JSON.stringify(error));
              console.log(JSON.stringify(error));
          });
        })
        .catch((error) => {
          env.showToast(error.message);
            console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { 
      env.showToast(JSON.stringify(error));
      console.log(JSON.stringify(error)) });
}


doGoogleLogin(){
  let nav = this.navCtrl;
  let env = this;
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '19993281606-npcoekmi8kje4ljdj3or2c0q3blhnnee.apps.googleusercontent.com', 
    'offline': true
  })
  .then(function (response) {
    console.log("RESPONSE:"+JSON.stringify(response));
    loading.dismiss();
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
    console.log("Google Credential"+googleCredential);
    firebase.auth().signInWithCredential(googleCredential)
        .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            NativeStorage.setItem('user',
            {
              name: this.userProfile.displayName,
              picture: this.userProfile.photoURL
            })
            .then(function(){
              console.log("HOMEPAGE");
              nav.setRoot(HomePage);
            }, function (error) {
              env.showToast(JSON.stringify(error));
              console.log(JSON.stringify(error));
          });
        })
        .catch((err) => {
            
            if(env.isEmpty(err)){
            console.log("No Problema" + JSON.stringify(err));
              
            nav.setRoot(HomePage);
          }
          env.showToast(JSON.stringify(err.message));
        });
  }, function (error) {
    env.showToast(JSON.stringify(error));
    console.log(JSON.stringify(error));
    loading.dismiss();
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

isEmpty(obj) {
var hasOwnProperty = Object.prototype.hasOwnProperty;
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

}
