import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReminderPage } from './add-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: AddReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReminderPageRoutingModule {}
