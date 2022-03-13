import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionListRoutingModule } from './transaction-list-routing.module';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionListService } from './transaction-list.service';


@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [
    TransactionListRoutingModule,
    MaterialModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    TransactionListService
  ],
})
export class TransactionModule { }
