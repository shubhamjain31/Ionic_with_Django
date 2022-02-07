import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService) {
    this.get_data()
  }

  async get_data(){
    const session_data = await this.storageService.getData();

    this.authenticationService.user_details({'day':"jshsj", "shj":"jhsjdhs"}, session_data.sessionid)
    .subscribe((resp: any) => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

}
