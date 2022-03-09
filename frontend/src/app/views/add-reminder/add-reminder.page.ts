import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IonicToastService } from 'src/app/services/ionic-toast.service';
import { StorageService } from 'src/app/services/storage.service';

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

  constructor(public modalCtlr: ModalController, private authenticationService: AuthenticationService, private ionicToastService: IonicToastService,
    private storageService:StorageService) { }

  ngOnInit() {
  }

  async add(){
    const session_data = await this.storageService.getData();

    this.newReminderObj = {itemTitle:       this.itemTitle,
                          itemNote:         this.itemNote, 
                          itemDate:         this.itemDate, 
                          itemTime:         this.itemTime
                    }
    let uid = this.itemTitle + this.itemDate;
    
    if(uid){
      this.authenticationService.add_reminder(this.newReminderObj, session_data['sessionid']).subscribe((data: any)=>{
        if (data["success"]){
          this.ionicToastService.showToast(data["msg"], 'success');
        }

        if (data["error"]){
          this.ionicToastService.showToast(data["msg"], 'danger');
        }
      })
    }else{
      this.ionicToastService.showToast('Can`t Save Empty Reminder', 'danger');
    }


    this.dismis()
    }


  async dismis(){
    await this.modalCtlr.dismiss(this.newReminderObj);
  }

}
