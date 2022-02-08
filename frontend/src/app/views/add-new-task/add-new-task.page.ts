import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories: any = ['work', 'personal'];
  categorySelectedCategory

  newTaskObj: any = {};
  itemName: string;
  itemDueDate: any;
  itemPriority: string;
  itemCategory: string;

  constructor(public modalCtlr: ModalController) { }

  ngOnInit() {
  }

  async add(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    console.log(this.newTaskObj);
    let uid = this.itemName + this.itemDueDate
    
    if(uid){
      // await this.todoService.addTask(uid,this.newTaskObj)
    }else{
      console.log("can't save empty task");
    }


    this.dismis()
  }

  selectCategory(index){
    this.categorySelectedCategory = this.categories[index];
  }

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }

}
