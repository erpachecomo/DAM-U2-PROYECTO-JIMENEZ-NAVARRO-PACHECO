import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { NativeStorage } from 'ionic-native';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    console.log('HomePage opened');
    NativeStorage.getItem('user').then(data=>{
          console.log("HOMEPAGE");
          console.log(JSON.stringify(data));          
        }, function (error) {
          console.log('Error google login');
          console.log(JSON.stringify(error));
        });
  }

  abrirMenu(){
    this.navCtrl.setRoot(MenuPage);
  }

}
