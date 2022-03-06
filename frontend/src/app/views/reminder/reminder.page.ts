import { Component, OnInit } from '@angular/core';
import { AddReminderPage } from '../add-reminder/add-reminder.page';
import { ModalController, AlertController } from '@ionic/angular';
import { IonicToastService } from '../../services/ionic-toast.service';


@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  todoList: any = [1];

  constructor(public modalCtlr: ModalController, private ionicToastService: IonicToastService) { }

  ngOnInit() {
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
      this.todoList   = [];
    })
    return await modal.present()
  }


}
