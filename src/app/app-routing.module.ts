import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization-guard';

const routes: Routes = [
  {
    path: 'mpl',
    loadChildren: () => import('./client-apps/mpl.module').then(module => module.MplWrapperModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'spv',
    loadChildren: () => import('./client-apps/spv.module').then(module => module.SpvModule)
  },
  {
    path: 'toh',
    loadChildren: () => import('./client-apps/toh.module').then(module => module.TohModule)

  },
  {
    path: 'sender',
    loadChildren: () => import('./client-apps/sender.module').then(module => module.SenderModule)
  },
  {
    path: 'receiver',
    loadChildren: () => import('./client-apps/receiver.module').then(module => module.ReceiverModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./client-apps/login.module').then(module => module.LoginModule)
  },
  {
    path: '',
    redirectTo: 'mpl',
    pathMatch: 'full',
    canActivate: [AuthorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
