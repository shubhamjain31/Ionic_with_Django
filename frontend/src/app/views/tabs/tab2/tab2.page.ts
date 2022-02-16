import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UpdateTaskPage } from '../../update-task/update-task.page';
import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';
import { GetSetDataService } from '../../../services/get-set-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  todoList: any = []
  loader: boolean = false;
  no_todo: string;

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService, public modalCtlr: ModalController,
    public getSetDataService: GetSetDataService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    let todo_data = this.getSetDataService.get_done_todo_data();
    setTimeout(() => {
      this.loader = true;
      if(todo_data.length === 0){
        this.all_completed_todos();
      }
      else{
        this.todoList = todo_data;
      }
      this.no_todo  = "No Todos";
    }, 3000)
   }

  async all_completed_todos(){
    const session_data = await this.storageService.getData();

    this.authenticationService.completed_todos(session_data.sessionid)
    .subscribe((resp: any) => {
      if (resp["success"]){
        this.todoList = resp['todos_list'];
      }
    }, err => {
      console.log(err);
    });
  }

  async open(selectedTask){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    // modal.onDidDismiss().then(()=>{
    //   this.get_all_todos();
    // })
    
    return await modal.present()
  }

}
