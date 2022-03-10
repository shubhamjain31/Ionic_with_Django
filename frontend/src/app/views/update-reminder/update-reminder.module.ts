import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateReminderPageRoutingModule } from './update-reminder-routing.module';

import { UpdateReminderPage } from './update-reminder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateReminderPageRoutingModule
  ],
  declarations: [UpdateReminderPage]
})
export class UpdateReminderPageModule {}
