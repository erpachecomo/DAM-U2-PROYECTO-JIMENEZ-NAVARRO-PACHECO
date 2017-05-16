import { MenuPage } from './../pages/menu/menu';
import { WelcomePage } from './../pages/welcome/welcome';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
<<<<<<< HEAD
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AdminPanelPage } from '../pages/admin-panel/admin-panel';
import { EncodeDataPage } from '../pages/encode-data/encode-data';
=======
import { AngularFireModule } from 'angularfire2';


export const firebaseConfig = {
    apiKey: "AIzaSyDklHeVcowOdSz0Xt8GFxzGhPb18HUGOls",
    authDomain: "fir-poktli.firebaseapp.com",
    databaseURL: "https://fir-poktli.firebaseio.com",
    projectId: "firebase-poktli",
    storageBucket: "firebase-poktli.appspot.com",
    messagingSenderId: "19993281606"
};
>>>>>>> 778afc097781c3461f135917eedff8c6665c1803

@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    AdminPanelPage,
    EncodeDataPage,
    WelcomePage
=======
    WelcomePage,
    MenuPage
>>>>>>> 778afc097781c3461f135917eedff8c6665c1803
  ],
  imports: [
    IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    AdminPanelPage,
    EncodeDataPage,
    WelcomePage
=======
    WelcomePage,
    MenuPage
>>>>>>> 778afc097781c3461f135917eedff8c6665c1803
  ],
  providers:
   [ BarcodeScanner,
   {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
