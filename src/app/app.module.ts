import { AdminMenuPage } from './../pages/admin-menu/admin-menu';
import { MenuPage } from './../pages/menu/menu';
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
import { AngularFireModule } from 'angularfire2';
//import { Facebook } from '@ionic-native/facebook'
import { Facebook, NativeStorage, GooglePlus } from 'ionic-native';



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
    WelcomePage,
    BookPage,
    BillPage,
    MenuPage,
    AdminMenuPage

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
    BookPage,
    BillPage,
    MenuPage,
    AdminMenuPage

  ],
  providers:
   [ BarcodeScanner,Facebook,
   {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
