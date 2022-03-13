import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientViewComponent } from './client-view.component';

const routes: Routes = [
 { path: 'client-view', component: ClientViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientViewRoutingModule { }
