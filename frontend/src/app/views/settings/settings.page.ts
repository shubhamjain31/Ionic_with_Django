import { Component, OnInit } from '@angular/core';
import { GetSetDataService } from 'src/app/services/get-set-data.service';

import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  darkMode: boolean = true;

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService, public getSetDataService: GetSetDataService) { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.settings();
   }

  theme_mode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark' );
    
  }

  async settings(){
    let session_data: any;
    if(Object.keys(this.getSetDataService.get_session_data()).length != 0){
      session_data = this.getSetDataService.get_session_data();
    }
    else{
      session_data = await this.storageService.getData();
    }

    this.authenticationService.todo_settings(session_data.sessionid)
    .subscribe((resp: any) => {
      if (resp["success"]){
        console.log(resp);
      }
    }, err => {
      console.log(err);
    });
  }

}
