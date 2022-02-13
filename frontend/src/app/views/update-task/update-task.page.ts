import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { IonicToastService } from '../../services/ionic-toast.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task;
  categories: any =[]
  categorySelectedCategory: any;

  newTaskObj: any = {};
  itemName: string;
  itemDueDate: any;
  itemPriority: string;
  itemCategory: string;

  constructor(public modalCtlr:ModalController, private storageService:StorageService, private ionicToastService: IonicToastService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.categories.push('work');
    this.categories.push('personal');

    this.itemName                   = this.task.fields.name;
    this.itemDueDate                = this.task.fields.due_date;
    this.itemPriority               = this.task.fields.priority;
    this.categorySelectedCategory   = this.task.fields.category;
  }

  async dismis(){
    await this.modalCtlr.dismiss()
  }

  selectCategory(index: number){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }

  async update(){
    const session_data = await this.storageService.getData();

    this.newTaskObj = {itemName:      this.itemName, 
                      itemDueDate:    this.itemDueDate, 
                      itemPriority:   this.itemPriority,
                      itemCategory:   this.categorySelectedCategory,
                      id_:            this.task.pk
                    }
                    
    this.authenticationService.update_todo(this.newTaskObj, session_data['sessionid']).subscribe((data: any)=>{
      if (data["success"]){
        this.ionicToastService.showToast(data["msg"], 'success');
      }

      if (data["error"]){
        this.ionicToastService.showToast(data["msg"], 'danger');
      }

      this.dismis();
    })
  }
}
