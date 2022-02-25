import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GetSetDataService } from '../../services/get-set-data.service';
import { IonicToastService } from '../../services/ionic-toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-todays',
  templateUrl: './todays.page.html',
  styleUrls: ['./todays.page.scss'],
})
export class TodaysPage implements OnInit {
  todoList: any = [];

  constructor(public getSetDataService: GetSetDataService, private ionicToastService: IonicToastService, private storageService:StorageService, 
    public authenticationService: AuthenticationService, public modalCtlr: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todoList = this.getSetDataService.todays_todo();
   }

   async open(selectedTask: any){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    return await modal.present()
  }

  async undo(status: boolean, item: any){
    const session_data = await this.storageService.getData();

    if(status === false){
      status = true
    }
    else{
      status = false
    }

    let data_ ={
      'id_':      item['pk'],
      'status':   status
    }

    this.authenticationService.bookmark_todo(data_, session_data.sessionid).subscribe((resp: any) => {
      if(resp["success"]){
        this.ionicToastService.showToast(resp["msg"], 'success');
        this.getSetDataService.change_bookmark_status(this.todoList, item['pk'], status);
      }
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
  }

}
