import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationWindowComponent, ConfWindowComponent } from './confirmation-popup/confirmation-popup.component';
import { MaterialModule } from '../material.module';




@NgModule({
  declarations: [
    ConfirmationWindowComponent,
    ConfWindowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],

  exports: [
    ConfirmationWindowComponent,
    ConfWindowComponent
  ],

  entryComponents: [
    ConfirmationWindowComponent,
    ConfWindowComponent
  ]
})
export class SharedModule { }
