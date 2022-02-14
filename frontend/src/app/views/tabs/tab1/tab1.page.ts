import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { UpdateTaskPage } from '../../update-task/update-task.page';

import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';
import { AddNewTaskPage } from '../../add-new-task/add-new-task.page';
import { IonicToastService } from '../../../services/ionic-toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todoList: any = []
  loader: boolean = false;

  today: number = Date.now();
  no_todo: string;

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService, public modalCtlr: ModalController,
    private ionicToastService: IonicToastService, private alertCtrl: AlertController) {}

  ngOnInit() {
    setTimeout(() => {
      this.loader = true;
      this.get_all_todos();
    }, 3000)
  }

  async get_all_todos(){
    const session_data = await this.storageService.getData();

    this.authenticationService.todos_list(session_data.sessionid)
    .subscribe((resp: any) => {
      if (resp["success"]){
        this.todoList = resp['all_todos'];
        this.no_todo  = "No Todos";
      }
    }, err => {
      console.log(err);
    });
  }

  async addNewItem() {
    const modal = await this.modalCtlr.create({
      component: AddNewTaskPage,
    })
    modal.onDidDismiss().then(newTask =>{
      this.get_all_todos();
    })
    return await modal.present()
  }

  async complete_task(event: any, id: number){
    const session_data = await this.storageService.getData();

    let todo_data = {
      'id':     id,
      'done':    event.target.checked
    }
    this.authenticationService.todo_status(todo_data, session_data.sessionid)
    .subscribe((resp: any) => {
      if(resp["ticked"]){
        this.change_status(this.todoList, id, event.target.checked);
        this.ionicToastService.showToast(resp["msg"], 'success');
      }
      if(resp["not_ticked"]){
        this.change_status(this.todoList, id, event.target.checked);
      }
    }, err => {
      console.log(err);
    });
  }

  filter_data(all_data: any, single_data: number){
    for(let i=0; i<all_data.length; i++){
      if(all_data[i]['pk'] === single_data){
        return all_data[i];
      }
    }
  }

  change_status(all_data: any, single_data: number, status: boolean){
    for(let i=0; i<all_data.length; i++){
      if(all_data[i]['pk'] === single_data){
        all_data[i]['fields']['done'] = status;

        this.todoList = all_data;
        return all_data;
      }
    }
  }

  async update(selectedTask){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.get_all_todos();
    })
    
    return await modal.present()
  }

  async delete(item: number) {
    const session_data = await this.storageService.getData();

    let data_ ={
      'id_':      item['pk']
    }

    this.authenticationService.delete_todo(data_, session_data.sessionid).subscribe((resp: any) => {
      if(resp["success"]){
        this.ionicToastService.showToast(resp["msg"], 'success');
        this.get_all_todos();
      }
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
  }

  async presentConfirm(item: number) {
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
            this.delete(item);
          }
        }
      ]
    });
    await alert.present();
  }

  async starred(status: boolean, item: any){
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
        this.get_all_todos();
      }
      if(resp["error"]){
        this.ionicToastService.showToast(resp["msg"], 'danger');
      }
    })
  }

}
