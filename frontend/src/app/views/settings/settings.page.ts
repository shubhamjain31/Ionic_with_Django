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
  darkMode: boolean;

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService, public getSetDataService: GetSetDataService) { 
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {
    this.darkMode = this.getSetDataService.get_theme_mode();
  }

  ionViewWillEnter() {
    // this.darkMode = this.getSetDataService.get_theme_mode();
    console.log(this.darkMode)
    // this.settings();
   }

  async theme_mode() {
    this.darkMode = !this.darkMode
    console.log(this.darkMode)
    document.body.classList.toggle( 'dark' );
   
    let session_data: any;
    if(Object.keys(this.getSetDataService.get_session_data()).length != 0){
      session_data = this.getSetDataService.get_session_data();
    }
    else{
      session_data = await this.storageService.getData();
    }

    this.getSetDataService.set_theme_mode(this.darkMode);
    this.authenticationService.mode_change({'mode_status': this.darkMode},session_data.sessionid)
    .subscribe((resp: any) => {
      if (resp["success"]){
        
      }
    }, err => {
      console.log(err);
    });
    
  }

  async settings(){
  }

}
