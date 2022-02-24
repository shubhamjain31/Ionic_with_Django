import { Component, OnInit } from '@angular/core';
import { GetSetDataService } from '../../services/get-set-data.service';
import { IonicToastService } from '../../services/ionic-toast.service';
import { StorageService } from '../../services/storage.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-todays',
  templateUrl: './todays.page.html',
  styleUrls: ['./todays.page.scss'],
})
export class TodaysPage implements OnInit {
  todoList: any = [];

  constructor(public getSetDataService: GetSetDataService, private ionicToastService: IonicToastService, private storageService:StorageService, 
    public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todoList = this.getSetDataService.todays_todo();
   }

}
