import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private storage: Storage) { 
    this.init();
  }

  init(){
    this.storage.create();
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    return this.storage.get("mylist").then(res => {
      if (res.sessionid) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
    });
  }
}
