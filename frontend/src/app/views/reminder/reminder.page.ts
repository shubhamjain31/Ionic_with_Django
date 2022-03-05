import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  todoList: any = [1];

  constructor() { }

  ngOnInit() {
  }

  update(item: any){

  }

  presentConfirm(item: any, i: number){

  }

  starred(item: any, item1: any){

  }

}
