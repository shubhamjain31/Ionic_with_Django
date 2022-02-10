import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { IonicToastService } from '../../services/ionic-toast.service';

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

  constructor(public modalCtlr: ModalController, private authenticationService: AuthenticationService, private storageService:StorageService,
          private ionicToastService: IonicToastService) { }

  ngOnInit() {
  }

  async add(){
    const session_data = await this.storageService.getData();

    this.newTaskObj = {itemName:      this.itemName, 
                      itemDueDate:    this.itemDueDate, 
                      itemPriority:   this.itemPriority,
                      itemCategory:   this.categorySelectedCategory
                    }
    let uid = this.itemName + this.itemDueDate
    
    if(uid){
      this.authenticationService.add_todo(this.newTaskObj, session_data['sessionid']).subscribe((data: any)=>{
        if (data["success"]){
          this.ionicToastService.showToast(data["msg"]);
        }
      })
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
