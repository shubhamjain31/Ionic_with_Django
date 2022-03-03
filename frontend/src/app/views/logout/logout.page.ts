import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public authenticationService: AuthenticationService, private router: Router, private storageService:StorageService) { }

  ngOnInit() {
    this.logout();
  }

  async logout() {
    const session_data = await this.storageService.getData();

    await this.authenticationService.logout(session_data.sessionid).subscribe((resp: any) => {});
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

}
