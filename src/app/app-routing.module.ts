import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full'  },
  { path: "login", component: LoginComponent },
  { path: "client", loadChildren: () => import('./client/client-list/client-list-module').then(m => m.ClientListModule) },
  { path: "client", loadChildren: () => import('./client/client-add/client-add.module').then(m => m.ClientAddModule) },
  { path: "client", loadChildren: () => import('./client/client-view/client-view.module').then(m => m.ClientViewModule) },
  { path: "transaction", loadChildren: () => import('./client/transaction-list/transaction-list.module').then(m => m.TransactionModule) },
  { path: "profile", loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: "cms", loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
