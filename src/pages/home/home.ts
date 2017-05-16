import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  abrirMenu(){
    this.navCtrl.setRoot(MenuPage);
  }

}
