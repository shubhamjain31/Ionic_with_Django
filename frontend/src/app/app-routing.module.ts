import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./views/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./views/login/login.module').then(m => m.LoginPageModule)
      },
    ]
  },
  {
    path: 'add-new-task',
    loadChildren: () => import('./views/add-new-task/add-new-task.module').then( m => m.AddNewTaskPageModule)
  },
  {
    path: 'update-task',
    loadChildren: () => import('./views/update-task/update-task.module').then( m => m.UpdateTaskPageModule)
  },
  {
    path: 'trash',
    loadChildren: () => import('./views/trash/trash.module').then( m => m.TrashPageModule)
  },
  {
    path: 'archive',
    loadChildren: () => import('./views/archive/archive.module').then( m => m.ArchivePageModule)
  },
  {
    path: 'todays',
    loadChildren: () => import('./views/todays/todays.module').then( m => m.TodaysPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.module').then( m => m.SettingsPageModule)
  },
  { 
    path: '**', 
    redirectTo: '/login',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
