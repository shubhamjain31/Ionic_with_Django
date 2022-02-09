import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from "./guards/login-guard.service";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./views/login/login.module').then(m => m.LoginPageModule),
        canActivate: [LoginGuardService]
      },
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'add-new-task',
    loadChildren: () => import('./views/add-new-task/add-new-task.module').then( m => m.AddNewTaskPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
