import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
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

}
