import {
  LoadingController,
  NavController,
  MenuController,
  ToastController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class BaseHelper {
  gLoading;
  supplierCache = [];

  constructor(
    protected loadingCtrl: LoadingController,
    protected toastController: ToastController,
    protected alert: AlertController,
    protected modal: ModalController,
    protected navCtrl: NavController,
    protected menu: MenuController
  ) {
    this.initLoadLoading();
  }
  menuOpen() {
    console.log(`menu open`);
    this.menu.enable(true);
  }
  menuClose() {
    console.log(`menu close`);
    this.menu.enable(false);
  }


  async toast(message, duration = 1000, color = `success`) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          // handler: () => {
          //   console.log('Cancel clicked');
          // },
        },
      ],
    });
    toast.present();
  }
  async initLoadLoading() {
    this.gLoading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      duration: 5000,
    });
  }
  async loadLoading(toggle = true) {
    if (toggle) {
      if (!this.gLoading) {
        await this.initLoadLoading();
      }
      this.gLoading.present();
    } else {
      if (this.gLoading) {
        await this.gLoading.dismiss();
      }

      this.initLoadLoading();
    }
    return;
  }
  async loadAlert(header,msg){
     const alert = await this.alert.create({
      header,
      message: msg,
      buttons: ['Ok'],
     });
     alert.present();

   }

  async setStorage(key, value) {
    //await this.storage.set(key, value);
  }
  async getStorage(key) {
    //return await this.storage.get(key);
  }


  navigateRoot(path, queryParams = null) {
    if (queryParams) {
      const navigationExtras: NavigationExtras = {
        queryParams,
      };
      this.navCtrl.navigateRoot(path, navigationExtras);
    } else {
      this.navCtrl.navigateRoot(path);
    }
  }

  navigateWithParam(path, queryParams) {
    if (queryParams) {
      const navigationExtras: NavigationExtras = {
        queryParams,
      };
      this.navCtrl.navigateForward(path, navigationExtras);
    } else {
      this.navCtrl.navigateForward(path);
    }
  }


  navigate(path) {
    this.navCtrl.navigateForward(path);
  }
  navigateBack(path) {
    this.navCtrl.navigateBack(path);
  }
}
