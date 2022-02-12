import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthenticationService } from './services/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user_email: string = '';

  pages = [
    {
      title: 'Todays',
      url: '/calendar',
      icon: 'calendar'
    },
    {
      title: 'Reminder',
      url: '/reminder',
      icon: 'notifications'
    },
    {
      title: 'Trash',
      url: '/deleted',
      icon: 'trash'
    },
    {
      title: 'Archive',
      url: '/starred',
      icon: 'star'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    },
  ];
  constructor(private storageService:StorageService, public authenticationService: AuthenticationService, public menuCtlr:MenuController) { 
    this.initialApp()
  }

  async initialApp(){
    this.authenticationService.get_user_email().subscribe((email) => {
      this.user_email = email;
  });
    const session_data = await this.storageService.getData();

    try {
      if(Object.keys(session_data).length === 0){
      }
    }
    catch(e){
      this.storageService.addData({});
    }
  }

  async dismis(){
    console.log('sksdjs')
    await this.menuCtlr.close()
  }
}
