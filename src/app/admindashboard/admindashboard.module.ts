import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';
import { AddEligiblityComponent } from './add-eligiblity/add-eligiblity.component';
import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddLoanOfficerComponent } from './add-loan-officer/add-loan-officer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewLoanOfficerComponent } from './view-loan-officer/view-loan-officer.component';
import { ViewSchemesComponent } from './view-schemes/view-schemes.component';
import { LoanDashboardChartComponent } from '../loan-dashboard-chart/loan-dashboard-chart.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddSchemeComponent,
    AddEligiblityComponent,
    ViewAnalyticsComponent,
    AdmindashboardComponent,
    AddLoanOfficerComponent,
    ViewLoanOfficerComponent,
    ViewSchemesComponent,
    LoanDashboardChartComponent
  ],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
   
  ]
})
export class AdmindashboardModule { }
