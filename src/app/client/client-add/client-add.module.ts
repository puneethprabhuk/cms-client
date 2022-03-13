import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ClientAddRoutingModule } from './client-add-routing.module';
import { ClientAddComponent } from './client-add.component';
import { ClientAddService } from './client-add.service';


@NgModule({
  declarations: [
    ClientAddComponent
  ],
  imports: [
    ClientAddRoutingModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClientAddService,
  ],
})
export class ClientAddModule { }
