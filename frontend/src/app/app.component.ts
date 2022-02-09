import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages = [
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    },
    {
      title: 'Contact',
      url: '',
      icon: 'person'
    },
    {
      title: 'About',
      url: '',
      icon: 'information-circle'
    }
  ];
  constructor(private storageService:StorageService) { 
    this.initialApp()
  }

  async initialApp(){
    const session_data = await this.storageService.getData();

    try {
      if(Object.keys(session_data).length === 0){
      }
    }
    catch(e){
      this.storageService.addData({});
    }
  }
}
