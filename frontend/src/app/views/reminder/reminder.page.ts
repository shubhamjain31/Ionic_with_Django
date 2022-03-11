import { Component, OnInit } from '@angular/core';
import { AddReminderPage } from '../add-reminder/add-reminder.page';
import { ModalController, AlertController } from '@ionic/angular';
import { IonicToastService } from '../../services/ionic-toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { UpdateReminderPage } from '../update-reminder/update-reminder.page';


@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  all_reminders: any = [];

  constructor(public modalCtlr: ModalController, private ionicToastService: IonicToastService, private authenticationService: AuthenticationService,
    private storageService:StorageService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.reminders_list();
  }

  async reminders_list(){
    const session_data = await this.storageService.getData();
    this.authenticationService.all_reminders(session_data['sessionid']).subscribe((data: any)=>{
      if(data['success']){
        this.all_reminders = data['all_reminders'];
      }
    });
  }

  async update(item: any){
    const modal = await this.modalCtlr.create({
      component: UpdateReminderPage,
      componentProps: {task: item}
    })

    modal.onDidDismiss().then(newTask=>{
      this.reminders_list();
    })
    
    return await modal.present()
  }

  starred(item: any, item1: any){

  }

  async addNewReminder(){
    const modal = await this.modalCtlr.create({
      component: AddReminderPage,
    })
    modal.onDidDismiss().then(newTask =>{
      if(Object.keys(newTask['data']).length != 0){
        this.reminders_list();
      }
    })
    return await modal.present()
  }

  async presentConfirm(item: number, index: number) {
    let alert: any = await this.alertCtrl.create({
      subHeader: 'Confirm Delete',
      message: 'Do you want to delete this reminder?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete_reminder(item, index);
          }
        }
      ]
    });
    await alert.present();
  }

  async delete_reminder(item: number, index: number) {
    const session_data = await this.storageService.getData();

    let data_ ={
      'id_':      item['pk']
    }

    this.authenticationService.delete_reminder(data_, session_data.sessionid).subscribe((resp: any) => {
      if(resp["success"]){
        this.ionicToastService.showToast(resp["msg"], 'success');
        this.reminders_list();
      }
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
  }


}
