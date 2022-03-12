import { Component, OnInit,Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { IonicToastService } from '../../services/ionic-toast.service';

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

  constructor(public modalCtlr:ModalController, private authenticationService: AuthenticationService, private storageService:StorageService,
    private ionicToastService: IonicToastService) {}

  ngOnInit() {
    this.itemTitle =       this.task.fields.title,
    this.itemNote =         this.task.fields.note, 
    this.itemDate =         this.task.fields.rem_date, 
    this.itemTime =         this.task.fields.rem_time
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  async update(){
    if(this.itemTitle === undefined){
      return;
    }

    if(this.itemNote === undefined){
      return;
    }

    if(this.itemTitle.trim() === ''){
      return;
    }

    if(this.itemNote.trim() === ''){
      return;
    }

    if(this.itemDate === undefined){
      return;
    }

    if(this.itemTime === undefined){
      return;
    }
    
    const session_data = await this.storageService.getData();
    this.newReminderObj = {itemTitle:      this.itemTitle, 
      itemNote:    this.itemNote, 
      itemDate:   this.itemDate,
      itemTime:   this.itemTime,
      id_:            this.task.pk
    }

    this.authenticationService.update_reminder(this.newReminderObj, session_data['sessionid']).subscribe((data: any)=>{
      if (data["success"]){
        this.ionicToastService.showToast(data["msg"], 'success');
      }

      if (data["error"]){
        this.ionicToastService.showToast(data["msg"], 'danger');
      }

      this.dismis();
    })
  }

}
