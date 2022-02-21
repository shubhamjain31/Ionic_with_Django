import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { AuthGuardService } from "./guards/auth-guard.service";
import { IonicToastService } from './services/ionic-toast.service';
import {IonicGestureConfig} from "./gestures/ionic-gesture-config";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot({name:"mydatabase",})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthenticationService, StorageService, AuthGuardService, IonicToastService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
