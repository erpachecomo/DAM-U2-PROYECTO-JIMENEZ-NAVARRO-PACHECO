import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Facebook, NativeStorage,GooglePlus } from 'ionic-native';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

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
  public register:any;
  public showRegister:boolean=false;
  public wrongData:boolean=false;

  public myForm: FormGroup;
  public name:any;
  public email:any;
  public password:any;
  FB_APP_ID: number = 1750492968544998;
  
  
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,public loadingCtrl:LoadingController) {
        Facebook.browserInit(this.FB_APP_ID, "v2.8");       
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    let specialRegex = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      register: [false],
      password: ['', [Validators.required,<any>Validators.pattern(specialRegex)]],
      email: ['', [<any>Validators.pattern(emailRegex), Validators.required]],
    });

    this.name = this.myForm.controls['name'];
    this.register = this.myForm.controls['register'];
    this.password = this.myForm.controls['password'];
    this.email = this.myForm.controls['email'];

  }
  containsSpecial():boolean{
    return '\\!"#$%&/()=?¡-.,_:;{´+*[]}─|@·~½¬|°'.includes(this.password.value);
  }
  changed(){
    this.showRegister=this.register.value;
  }
  continue(){
    if((this.email.valid&&this.password.valid&&!this.showRegister&&!this.name.valid)||this.myForm.valid){
      if(!this.showRegister){//Si es login
        if(this.password.value==='!admin'&&this.email.value==='admin@example.com'){
          //login correcto
          this.wrongData=false;
          this.navCtrl.push(HomePage);
          return;
        }else{
          this.wrongData=true;
          return;
        }
      }
      this.navCtrl.push(HomePage);      
      return;
    }
    this.wrongData=false;
  }
  ionViewDidLoad() {
  }
  doFbLogin(){
    console.log("Hello");
    let permissions = new Array();  
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

      console.log(JSON.stringify(permissions));

    Facebook.login(permissions)
    .then(function(response){
      console.log(JSON.stringify(response));
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
      

        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          console.log("HOMEPAGE");
          nav.push(HomePage);
        }, function (error) {
          console.log(JSON.stringify(error));
        })
      })
    }, function(error){
      console.log(JSON.stringify(error));
    });
  }

  doGoogleLogin(){
  let nav = this.navCtrl;
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '19993281606-npcoekmi8kje4ljdj3or2c0q3blhnnee.apps.googleusercontent.com', 
    'offline': true
  })
  .then(function (user) {
    loading.dismiss();

    NativeStorage.setItem('user', {
      name: user.displayName,
      email: user.email,
      picture: user.imageUrl
    })
    .then(function(){
      nav.push(HomePage);
    }, function (error) {
      console.log('Algo paso');
      console.log(JSON.stringify(error));
    })
  }, function (error) {
    console.log(JSON.stringify(error));
    loading.dismiss();
  });
}


}
