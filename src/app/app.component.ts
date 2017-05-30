import { AdminPanelPage } from './../pages/admin-panel/admin-panel';
import { firebaseConfig } from './app.module';

import { WelcomePage } from './../pages/welcome/welcome';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar,NativeStorage,GooglePlus, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = WelcomePage;

    constructor(platform: Platform) {
    
    firebase.initializeApp(firebaseConfig);

    platform.ready().then(() => {
      Splashscreen.hide();
      StatusBar.styleDefault();
        
      
    });
  }
   ngAfterViewInit(){
      //this.nav is now defined
      //setTimeout(() => {
      let env = this;

      GooglePlus.trySilentLogin({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '19993281606-npcoekmi8kje4ljdj3or2c0q3blhnnee.apps.googleusercontent.com', 
        // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })

      NativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        env.nav.setRoot(HomePage);
      }, function (error) {
        //we don't have the user data so we will ask him to log in
            NativeStorage.getItem('admin')
          .then( function (data) {
            // user is previously logged and we have his data
            // we will let him access the app
            env.nav.setRoot(AdminPanelPage);
          }, function (error) {
            //we don't have the user data so we will ask him to log in
            env.nav.setRoot(WelcomePage);
          });
      });
//      }, 2000);
    }
}
