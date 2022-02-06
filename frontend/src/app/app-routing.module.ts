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
      {
        path: 'signup',
        loadChildren: () => import('./views/signup/signup.module').then(m => m.SignupPageModule),
      }
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'logout',
    loadChildren: () => import('./views/logout/logout.module').then( m => m.LogoutPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
