import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';
import { RouterModule } from '@angular/router';
import { ClientAnalyticsComponent } from './client-analytics/client-analytics.component';
import { TransactionAnalyticsComponent } from './transaction-analytics/transaction-analytics.component';



@NgModule({
  declarations: [
    HomeComponent,
    ClientAnalyticsComponent,
    TransactionAnalyticsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    RouterModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
