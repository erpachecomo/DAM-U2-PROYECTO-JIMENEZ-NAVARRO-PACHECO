import { MenuPage } from './../pages/menu/menu';
import { WelcomePage } from './../pages/welcome/welcome';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';


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
    WelcomePage,
    MenuPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    MenuPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
