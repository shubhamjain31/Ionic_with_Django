import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodaysPageRoutingModule } from './todays-routing.module';

import { TodaysPage } from './todays.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodaysPageRoutingModule
  ],
  declarations: [TodaysPage, HeaderComponent]
})
export class TodaysPageModule {}
