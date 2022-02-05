import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public authenticationService: AuthenticationService) {
    this.authenticationService.user_details({'day':"jshsj", "shj":"jhsjdhs"})
    .subscribe((resp: any) => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

}
