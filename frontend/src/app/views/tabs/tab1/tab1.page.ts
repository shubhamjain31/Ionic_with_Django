import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';
import { AddNewTaskPage } from '../../add-new-task/add-new-task.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todoList: any = []

  today: number = Date.now();

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService, public modalCtlr: ModalController) {
    this.get_data();
  }

  async get_data(){
    const session_data = await this.storageService.getData();

    this.authenticationService.todos_list(session_data.sessionid)
    .subscribe((resp: any) => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

  async addNewItem() {
    const modal = await this.modalCtlr.create({
      component: AddNewTaskPage,
    })
    // modal.onDidDismiss().then(newTask =>{
    //   this.getAllTask()
    // })
    return await modal.present()
  }

}
