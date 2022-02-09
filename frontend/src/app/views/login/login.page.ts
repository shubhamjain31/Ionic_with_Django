import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(public menu: MenuController, private fb: FormBuilder, private alertController: AlertController, private router: Router,
    private loadingController: LoadingController, private authenticationService: AuthenticationService, private storageService:StorageService) {
    this.menu.enable(false);
    this.menu.swipeGesture(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.menu.swipeGesture(true);
  }
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }

  async login() {
    const loading = await this.loadingController.create();                // loader
    await loading.present();
    
    this.authenticationService.loginUser(this.credentials.value).subscribe(
      async (res) => {
        if (res.sessionid != undefined){
          await loading.dismiss();       
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        }

        if (res.sessionid === undefined){
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Login failed',
            message: "Invalid Credentials",
            buttons: ['OK'],
          });
  
          await alert.present();                    // alert message
        }
      },
    );
  }


}
