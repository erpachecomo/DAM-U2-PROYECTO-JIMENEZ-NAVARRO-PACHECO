import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Facebook, NativeStorage,GooglePlus } from 'ionic-native';
import { FacebookAuth, GoogleAuth, User } from '@ionic/cloud-angular';

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
  //FB_APP_ID: number = 1750492968544998;
  constructor(public googleAuth: GoogleAuth,public facebookAuth: FacebookAuth, public user: User,public navCtrl: NavController, 
  public loadingCtrl:LoadingController) {
        //Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }
  continue(){
    let nav = this.navCtrl;
     NativeStorage.setItem('user',
        {
          name: "invitado"
        })
        .then(function(){
          console.log("HOMEPAGE");
          nav.setRoot(HomePage);
        }, function (error) {
          console.log(JSON.stringify(error));
        });
  }
  ionViewDidLoad() {
  }
  doFbLogin(){
    let nav = this.navCtrl;

    this.facebookAuth.login().then((data)=>{
      
      NativeStorage.setItem('user',
        {
          name: this.user.social.facebook.data.full_name,
          username: this.user.social.facebook.data.username,
          picture: this.user.social.facebook.data.profile_picture
        })
        .then(function(){
          console.log("HOMEPAGE");
          nav.setRoot(HomePage);
        }, function (error) {
          console.log(JSON.stringify(error));
        })
    });
  }

  doGoogleLogin(){
  let nav = this.navCtrl;

    this.googleAuth.login().then((data)=>{
      
      NativeStorage.setItem('user',
        {
          name: this.user.social.google.data.full_name,
          username: this.user.social.google.data.username,
          picture: this.user.social.google.data.profile_picture
        })
        .then(function(){
          console.log("HOMEPAGE");
          nav.setRoot(HomePage);
        }, function (error) {
          console.log('Error google login');
          console.log(JSON.stringify(error));
        })
    },err=>{
          console.log(JSON.stringify(err));
    });
}


}
