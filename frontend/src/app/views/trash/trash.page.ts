import { Component, OnInit } from '@angular/core';
import { GetSetDataService } from '../../services/get-set-data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
})
export class TrashPage implements OnInit {
  todoList: any = [];
  
  constructor(public getSetDataService: GetSetDataService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todoList = this.getSetDataService.trash_todos();
   }

   enable_options(){
     console.log('djshs')
   }

}
