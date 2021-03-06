import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastService {
  private myToast: any;

  constructor( private toast: ToastController) { }

  showToast(message, color) {
    this.myToast = this.toast.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
      cssClass:"toaster-class",
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then((toastData) => {
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }

}
