import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from "../../guards/auth-guard.service";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
