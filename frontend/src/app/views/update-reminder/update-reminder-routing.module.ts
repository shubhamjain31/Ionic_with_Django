import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateReminderPage } from './update-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateReminderPageRoutingModule {}
