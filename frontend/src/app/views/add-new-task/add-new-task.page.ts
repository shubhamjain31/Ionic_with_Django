import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { IonicToastService } from '../../services/ionic-toast.service';
import { GetSetDataService } from '../../services/get-set-data.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories: any = [];
  categorySelectedCategory

  newTaskObj: any = {};
  itemName: string;
  itemDueDate: any;
  itemPriority: string;
  itemCategory: string;
  todoList: any = []

  constructor(public modalCtlr: ModalController, private authenticationService: AuthenticationService, private storageService:StorageService,
          private ionicToastService: IonicToastService,  public alertController: AlertController, public getSetDataService: GetSetDataService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    let all_categories: any = this.getSetDataService.category_list();
    if(all_categories.length > 2){
      this.categories = all_categories;
    }
    else{
      this.categories = ['work', 'personal'];
    }
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
          this.ionicToastService.showToast(data["msg"], 'success');
        }

        if (data["error"]){
          this.ionicToastService.showToast(data["msg"], 'danger');
        }
      })
    }else{
      this.ionicToastService.showToast('Can`t Save Empty Task', 'danger');
    }


    this.dismis()
  }

  selectCategory(index){
    this.categorySelectedCategory = this.categories[index];
  }

  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj);
  }

  async getAllTask(){
    const session_data = await this.storageService.getData();

    this.todoList = this.authenticationService.todos_list(session_data['sessionid'])
  }

  new_category() {
    this.alertController.create({
      header: 'Add New Category',
      // subHeader: '',
      // message: '',
      inputs: [
        {
          name: 'Category',
          placeholder: 'Enter Category',
          
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            
          }
        },
        {
          text: 'Add',
          handler: (data: any) => {
            if(data['Category'].trim() === ''){
              this.ionicToastService.showToast('Category Cannot Be Empty!', 'danger');
              return;
            }
            this.categories.push(data['Category'])
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
