import { MenuPage } from './../pages/menu/menu';
import { WelcomePage } from './../pages/welcome/welcome';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CloudSettings,CloudModule} from '@ionic/cloud-angular'

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e460466e'
  },
  'auth': {
    'facebook': {
      'scope': []
    },
    'google': {
      'webClientId': '19993281606-v2o5pa8plpp84gpemnfftmktlc6nu9kv.apps.googleusercontent.com',
      'scope':[]
    }
  }
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
    CloudModule.forRoot(cloudSettings)
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
