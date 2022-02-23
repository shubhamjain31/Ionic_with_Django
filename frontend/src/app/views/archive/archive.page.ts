import { Component, OnInit } from '@angular/core';
import { GetSetDataService } from '../../services/get-set-data.service';
import { IonicToastService } from '../../services/ionic-toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.page.html',
  styleUrls: ['./archive.page.scss'],
})
export class ArchivePage implements OnInit {
  todoList: any = [];

  constructor(public getSetDataService: GetSetDataService, private alertCtrl: AlertController, private ionicToastService: IonicToastService,
    private storageService:StorageService, public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todoList = this.getSetDataService.archieve_todos();
   }

   async delete(item: any, i: number){
    const session_data = await this.storageService.getData();

    let data_ ={
      'id_':      item['pk']
    }

    this.getSetDataService.trash_todo(this.todoList, item, i);

    this.authenticationService.trash_todo(data_, session_data.sessionid).subscribe((resp: any) => {
      if(resp["success"]){
        this.ionicToastService.showToast(resp["msg"], 'success');
      }
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
   }

   async presentConfirm(item: number, index: number) {
    let alert: any = await this.alertCtrl.create({
      subHeader: 'Confirm Delete',
      message: 'Do you want to delete this todo?',
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

  async unarchive(item: any, i: number){
    const session_data = await this.storageService.getData();

    let data_ ={
      'id_':      item['pk']
    }

    this.getSetDataService.unarchive_todo(this.todoList, item, i);

    this.authenticationService.unarchive_todo(data_, session_data.sessionid).subscribe((resp: any) => {
      if(resp["success"]){
        this.ionicToastService.showToast(resp["msg"], 'success');
      }
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
   }

}
