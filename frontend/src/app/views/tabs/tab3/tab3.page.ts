import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user_data: any  = {};

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService) {}
  
  ngOnInit() {
    this.profile();
  }

  async profile(){
    const session_data = await this.storageService.getData();

    this.authenticationService.user_profile(session_data.sessionid)
    .subscribe((resp: any) => {
      if (resp["success"]){
        this.user_data = resp['user_data'];
      }
    }, err => {
      console.log(err);
    });
  }

}
