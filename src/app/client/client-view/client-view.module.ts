import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ClientViewRoutingModule } from './client-view-routing.module';
import { ClientViewComponent } from './client-view.component';
import { ClientViewService } from './client-view.service';
import { TransactionAddComponent, TransactionAddComponentPopup } from './transaction-add/transaction-add.component';
import { ClientUpdatedComponent, ClientUpdatedComponentPopUp } from './client-updated/client-updated.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClientViewComponent,
    TransactionAddComponent,
    ClientUpdatedComponent,
    TransactionAddComponentPopup,
    ClientUpdatedComponentPopUp
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ClientViewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    TransactionAddComponent,
    ClientUpdatedComponent,
    TransactionAddComponentPopup,
    ClientUpdatedComponentPopUp
  ],
  providers: [
    ClientViewService
  ],
})
export class ClientViewModule { }
