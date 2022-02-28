import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication.service';
import { StorageService } from '../../../services/storage.service';
import { GetSetDataService } from '../../../services/get-set-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  user_data: any  = {};
  total_counts: any = {};
  theme_mode: boolean = false;

  constructor(public authenticationService: AuthenticationService, private storageService:StorageService, public getSetDataService: GetSetDataService,
    private alertController: AlertController, private loadingController: LoadingController) {}
  
  async ngOnInit() {
    this.theme_mode =this.getSetDataService.get_theme_mode();
    this.profile();
    const loading = await this.loadingController.create();                // loader
    await loading.present();

    setTimeout(async() => {
      this.total_counts = this.getSetDataService.all_counts();
      await loading.dismiss();
    }, 1000)
  }

  ionViewWillEnter() {
    this.total_counts = this.getSetDataService.all_counts();
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
