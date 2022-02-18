import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public authenticationService: AuthenticationService) { }

  canActivate(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
