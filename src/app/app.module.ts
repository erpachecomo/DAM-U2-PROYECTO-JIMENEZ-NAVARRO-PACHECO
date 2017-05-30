import { AdminmenuPage } from './../pages/adminmenu/adminmenu';
import { MenuuserPage } from './../pages/menuuser/menuuser';
import { DishesPage } from './../pages/dishes/dishes';
import { DrinksPage } from './../pages/drinks/drinks';
import { DessertsPage } from './../pages/desserts/desserts';
import { AdminDrinksPage } from './../pages/admin-drinks/admin-drinks';
import { AdminDessertsPage } from './../pages/admin-desserts/admin-desserts';
import { AdminDishesPage } from './../pages/admin-dishes/admin-dishes';

import { AdminMenuPage } from './../pages/admin-menu/admin-menu';
import { DishaddPage } from './../pages/dishadd/dishadd';
import { WelcomePage } from './../pages/welcome/welcome';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AdminPanelPage } from '../pages/admin-panel/admin-panel';
import { EncodeDataPage } from '../pages/encode-data/encode-data';
import { BillPage } from '../pages/bill/bill';
import { BookPage } from '../pages/book/book';
import { PromoPage } from '../pages/promo/promo';
import { AngularFireModule } from 'angularfire2';
import { CallNumber } from '@ionic-native/call-number';
//import { Facebook } from '@ionic-native/facebook'
import { Facebook, NativeStorage, GooglePlus } from 'ionic-native';
import { ParallaxHeader } from '../components/parallax-header/parallax-header';
import { Camera } from '@ionic-native/camera';




export const firebaseConfig = {
  apiKey: "AIzaSyDklHeVcowOdSz0Xt8GFxzGhPb18HUGOls",
  authDomain: "fir-poktli.firebaseapp.com",
  databaseURL: "https://fir-poktli.firebaseio.com",
  projectId: "firebase-poktli",
  storageBucket: "firebase-poktli.appspot.com",
  messagingSenderId: "19993281606"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdminPanelPage,
    EncodeDataPage,
    ParallaxHeader,
    WelcomePage,
    BookPage,
    PromoPage,
    BillPage,
    DishaddPage,
    AdminMenuPage,
    DishesPage,
    DessertsPage,
    DrinksPage,
    MenuuserPage,
    AdminmenuPage,
    AdminDessertsPage,
    AdminDishesPage,
    AdminDrinksPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdminPanelPage,
    EncodeDataPage,
    WelcomePage,
    PromoPage,
    BookPage,
    BillPage,
    AdminMenuPage,
    DishaddPage,
    DishesPage,
    DessertsPage,
    DrinksPage,
    MenuuserPage,
    AdminmenuPage,
    AdminDessertsPage,
    AdminDishesPage,
    AdminDrinksPage

  ],
  providers:

   [ BarcodeScanner,Facebook,Camera,CallNumber,
   {provide: ErrorHandler, useClass: IonicErrorHandler}]

})
export class AppModule { }
