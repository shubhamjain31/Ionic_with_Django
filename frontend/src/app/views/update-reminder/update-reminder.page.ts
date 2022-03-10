import { Component, OnInit,Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-reminder',
  templateUrl: './update-reminder.page.html',
  styleUrls: ['./update-reminder.page.scss'],
})
export class UpdateReminderPage implements OnInit {
  @Input() task;

  newReminderObj: any = {};

  itemNote: string;
  itemTitle: string;
  itemDate: any;
  itemTime: any;

  constructor(public modalCtlr:ModalController) {}

  ngOnInit() {
    this.itemTitle =       this.task.fields.title,
    this.itemNote =         this.task.fields.note, 
    this.itemDate =         this.task.fields.rem_date, 
    this.itemTime =         this.task.fields.rem_time
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  update(){
    this.newReminderObj = {itemTitle:      this.itemTitle, 
      itemNote:    this.itemNote, 
      itemDate:   this.itemDate,
      itemTime:   this.itemTime,
      id_:            this.task.pk
    }
  }

}
