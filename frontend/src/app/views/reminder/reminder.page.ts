import { Component, OnInit } from '@angular/core';
import { AddReminderPage } from '../add-reminder/add-reminder.page';
import { ModalController, AlertController } from '@ionic/angular';
import { IonicToastService } from '../../services/ionic-toast.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  all_reminders: any = [];

  constructor(public modalCtlr: ModalController, private ionicToastService: IonicToastService, private authenticationService: AuthenticationService,
    private storageService:StorageService) { }

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

  update(item: any){

  }

  presentConfirm(item: any, i: number){

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


}
