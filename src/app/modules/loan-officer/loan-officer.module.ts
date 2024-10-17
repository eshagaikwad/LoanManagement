import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanOfficerRoutingModule } from './loan-officer-routing.module';
import { ViewAssignedLoansComponent } from './view-assigned-loans/view-assigned-loans.component';
import { ReviewLoanApplicationsComponent } from './review-loan-applications/review-loan-applications.component';
import { VerifyCollateralComponent } from './verify-collateral/verify-collateral.component';


@NgModule({
  declarations: [
    ViewAssignedLoansComponent,
    ReviewLoanApplicationsComponent,
    VerifyCollateralComponent
  ],
  imports: [
    CommonModule,
    LoanOfficerRoutingModule
  ]
})
export class LoanOfficerModule { }
