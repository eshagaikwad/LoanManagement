import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserdashboardRoutingModule } from './userdashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EligibilityComponent } from './eligibility/eligibility.component';
import { LoanSchemeComponent } from './loan-scheme/loan-scheme.component';
import { RepaymentComponent } from './repayment/repayment.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanStatusComponent } from './loan-status/loan-status.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { CreditScoreComponent } from './credit-score/credit-score.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { UploadCollateralComponent } from './upload-collateral/upload-collateral.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DashboardComponent,
    EligibilityComponent,
    LoanSchemeComponent,
    RepaymentComponent,
    LoanStatusComponent,
    LoanCalculatorComponent,
    CreditScoreComponent,
    UploadCollateralComponent
  ],
  imports: [
    CommonModule,
    UserdashboardRoutingModule,
    RouterModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatPaginatorModule
   
  ]
})
export class UserdashboardModule { }
