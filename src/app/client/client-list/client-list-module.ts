import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientListRoutingModule } from './client-list-routing.module';
import { ClientListComponent } from './client-list.component';
import { ClientListService } from './client-list.service';





@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    ClientListRoutingModule,
    MaterialModule,
    CommonModule,
    SharedModule,
  
  ],
  providers: [
    ClientListService
  ],
})
export class ClientListModule { }
