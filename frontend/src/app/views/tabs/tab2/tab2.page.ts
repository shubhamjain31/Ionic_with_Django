import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { UpdateTaskPage } from '../../update-task/update-task.page';
import { GetSetDataService } from '../../../services/get-set-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  todoList: any = []
  loader: boolean = false;
  is_data: boolean = false;
  no_todo: string;

  constructor(public modalCtlr: ModalController, public getSetDataService: GetSetDataService) {}

  ngOnInit() {
    setTimeout(() => {
      this.loader = true;
      this.todoList = this.getSetDataService.completed_todo_list()
      this.no_todo  = "No Todos";

      this.is_data = true;
    }, 3000)
  }

  ionViewWillEnter() {
    if(this.is_data){
      this.loader = true;
      this.todoList = this.getSetDataService.completed_todo_list()
      this.no_todo  = "No Todos";
      }
   }

   ionViewWillLeave() {
    if(this.todoList === 0){
      this.is_data = false;
    }
    // this.todoList = [];
    // this.no_todo = '';
    // this.loader = false;
  }

  async open(selectedTask){
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    // modal.onDidDismiss().then(()=>{
    // })
    
    return await modal.present()
  }

}
