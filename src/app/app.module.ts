import { WelcomePage } from './../pages/welcome/welcome';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AdminPanelPage } from '../pages/admin-panel/admin-panel';
import { EncodeDataPage } from '../pages/encode-data/encode-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdminPanelPage,
    EncodeDataPage,
    WelcomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdminPanelPage,
    EncodeDataPage,
    WelcomePage
  ],
  providers:
   [ BarcodeScanner,
   {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
