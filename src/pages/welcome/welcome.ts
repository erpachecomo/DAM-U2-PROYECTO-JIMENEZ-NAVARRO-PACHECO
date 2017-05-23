import { HomePage } from './../home/home';
import { AdminPanelPage} from './../admin-panel/admin-panel';
import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
//import { NativeStorage,GooglePlus } from 'ionic-native';
//import { Facebook } from '@ionic-native/facebook';
import { Facebook, NativeStorage, GooglePlus } from 'ionic-native';
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
  email:string='erpachecomo@ittepic.edu.mx';
  password:string='poktli123';
  constructor(public navCtrl: NavController, private facebook:Facebook, public loadingCtrl:LoadingController) {
        

  }
  continue(){
    let nav = this.navCtrl;
    firebase.auth().signInAnonymously().then(success=>{
        NativeStorage.setItem('user',
        {
          name: "invitado"
        })
        .then(function(){
          console.log("Invitado");
          nav.setRoot(HomePage);
        }, function (err) {
          console.log("NativeStorage Invitado: "+JSON.stringify(err));
        });
    },err=>{
         console.log("NativeStorage Invitado: "+JSON.stringify(err));
    });
     
  }
continueAsAdmin(){
  let nav = this.navCtrl;
  firebase.auth().signInWithEmailAndPassword(this.email, this.password).
  then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            NativeStorage.setItem('user',
            {
              name: this.userProfile.displayName,
              picture: this.userProfile.photoURL
            })
            .then(function(){
              console.log("AdminPanelPage");
              nav.setRoot(AdminPanelPage);
            }, function (error) {
              console.log(JSON.stringify(error));
          })
        });
}

  doFbLogin(){
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
              console.log(JSON.stringify(error));
          });
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(JSON.stringify(error)) });
}


  doGoogleLogin(){
  let nav = this.navCtrl;
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
              console.log(JSON.stringify(error));
          });
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
            if(error==={}){
            console.log("No Problema" + JSON.stringify(error));
              
            nav.setRoot(HomePage);
          }
        });
  }, function (error) {
    console.log(JSON.stringify(error));
    loading.dismiss();
  });
}


}
