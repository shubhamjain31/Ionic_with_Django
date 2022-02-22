import { Component, OnInit } from '@angular/core';
import { GetSetDataService } from '../../services/get-set-data.service';
import { IonicToastService } from '../../services/ionic-toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';

import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
})
export class TrashPage implements OnInit {
  todoList: any = [];
  
  constructor(public getSetDataService: GetSetDataService, private alertCtrl: AlertController, private ionicToastService: IonicToastService,
    private storageService:StorageService, public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todoList = this.getSetDataService.trash_todos();
   }

   enable_options(){
     console.log('djshs')
   }

   async delete(item: any, i: number){
    const session_data = await this.storageService.getData();

    let data_ ={
      'id_':      item['pk']
    }

    this.getSetDataService.delete_todo(this.todoList, i);

    this.authenticationService.delete_todo(data_, session_data.sessionid).subscribe((resp: any) => {
      if(resp["success"]){
        this.ionicToastService.showToast(resp["msg"], 'success');
      }
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
   }

   async undo(item: any, i: number){
    const session_data = await this.storageService.getData();

    let data_ ={
      'id_':      item['pk']
    }

    this.getSetDataService.undo_todo(this.todoList, item, i);

    this.authenticationService.undo_todo(data_, session_data.sessionid).subscribe((resp: any) => {
      if(resp["success"]){}
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
   }

   async presentConfirm(item: number, index: number) {
    let alert: any = await this.alertCtrl.create({
      subHeader: 'Confirm Delete',
      message: 'Do you want to permanently delete this todo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete(item, index);
          }
        }
      ]
    });
    await alert.present();
  }

}
