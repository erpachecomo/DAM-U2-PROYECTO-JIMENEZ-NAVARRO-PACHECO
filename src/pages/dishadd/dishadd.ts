import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import firebase from 'firebase';





/*
  Generated class for the Dishadd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dishadd',
  templateUrl: 'dishadd.html'
})
export class DishaddPage {
public dishesImages: any;
  public myPhoto: any;
  public myPhotoURL: any='http://placehold.it/350?text=Poktli';
  dishes: FirebaseListObservable<any>;
  public name: string = "";
  public description: string="";
  public price: string="";
  public title: string="Añadir un platillo"
  public id: string="Añadir un platillo"
  public isUpdate: boolean=false;
  public photoReady: boolean=true;
  public errorName: boolean=false;
  public errorDescription: boolean=false;
  public errorPrice: boolean=false;
  public loading: any;
  public ingredients:Array<String>;
  public ingredient:String;

  constructor(public loadingCtrl:LoadingController,public camera: Camera,public navParams:NavParams, public viewCtrl:ViewController,public navCtrl: NavController, af: AngularFire) {
      this.dishesImages = firebase.storage().ref('/Dishes/');
      this.dishes = af.database.list('/dishes');
      let id=navParams.get('id');
      this.ingredients=[];
      if(id!=null){
        let npName=navParams.get('name');      
        let npDescription=navParams.get('description');
        let npPrice=navParams.get('price');
        let npImage=navParams.get('image');
        let npIngredients=navParams.get('ingredients');
      
        
        this.title="Editar "+npName;              
        this.name=(npName);
        this.price=(npPrice);
        this.description=(npDescription);
        this.myPhotoURL=(npImage);
        this.photoReady=true;
        this.ingredients=npIngredients;
        this.id=id;
        this.isUpdate=true;
      }//if

    
  }

  sendData() {
    //validaciones
    
    if(this.name===''){
      this.errorName=true;
      
    }
      this.errorName=false;
    if(this.price===''){
      this.errorPrice=true;
    
    }
      this.errorPrice=false;
    if(this.description===''){
      this.errorDescription=true;
    
    }
      this.errorDescription=false;
      if(!this.photoReady||this.errorDescription||this.errorName||this.errorPrice){return;}
      //Fin validaciones
    let data = {
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.myPhotoURL,
      ingredients:this.ingredients
    };
    console.log(JSON.stringify(data));
    if(this.isUpdate){
      this.dishes.update(this.id, data).then(
        (success)=>{
          this.navCtrl.pop();
        });
    }else{
      this.dishes.push(data).then(
        (success)=>{
          this.navCtrl.pop();
        });
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

 addIngredient(){
   if(this.ingredient!="")
      this.ingredients.push(this.ingredient);
  this.ingredient="";
 }
 deleteIngredient(i){
    this.ingredients.splice(i,1);
 }
  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.presentLoadingDefault();
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
 
  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.presentLoadingDefault();
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
 
  private uploadPhoto(): void {
    this.photoReady=false;
    
    this.dishesImages.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
        console.log("Guardando... "+this.myPhotoURL);
        this.photoReady=true;
        this.loading.dismiss();
      });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando imagen...'
    });

    this.loading.present();

  }
 
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
 