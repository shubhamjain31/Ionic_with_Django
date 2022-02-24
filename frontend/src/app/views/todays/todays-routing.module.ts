import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodaysPage } from './todays.page';

const routes: Routes = [
  {
    path: '',
    component: TodaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodaysPageRoutingModule {}
