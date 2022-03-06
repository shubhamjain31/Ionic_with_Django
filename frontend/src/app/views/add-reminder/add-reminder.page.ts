import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.page.html',
  styleUrls: ['./add-reminder.page.scss'],
})
export class AddReminderPage implements OnInit {
  newReminderObj: any = {};

  itemNote: string;
  itemTitle: string;
  itemDate: any;
  itemTime: any;

  constructor(public modalCtlr: ModalController) { }

  ngOnInit() {
  }

  async add(){

    this.newReminderObj = {itemTitle:       this.itemTitle,
                          itemNote:         this.itemNote, 
                          itemDate:         this.itemDate, 
                          itemTime:         this.itemTime
                    }
    let uid = this.itemTitle + this.itemDate
    
    if(uid){
      console.log(this.newReminderObj)
    }else{
    }


    this.dismis()
  }


  async dismis(){
    await this.modalCtlr.dismiss(this.newReminderObj);
  }

}
