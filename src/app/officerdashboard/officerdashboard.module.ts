import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficerdashboardRoutingModule } from './officerdashboard-routing.module';
import { LoanOfficerdashboardComponent } from './loan-officerdashboard/loan-officerdashboard.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { ViewRepaymentStatusComponent } from './view-repayment-status/view-repayment-status.component';
import { ViewCollateralComponent } from './view-collateral/view-collateral.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UploadAnalyticsComponent } from './upload-analytics/upload-analytics.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    LoanOfficerdashboardComponent,
    ViewApplicationsComponent,
    ViewRepaymentStatusComponent,
    ViewCollateralComponent,
    UploadAnalyticsComponent
  ],
  imports: [
    CommonModule,
    OfficerdashboardRoutingModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class OfficerdashboardModule { }
