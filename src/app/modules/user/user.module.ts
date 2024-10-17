import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { ApplyForLoanComponent } from './apply-for-loan/apply-for-loan.component';
import { ViewLoanStatusComponent } from './view-loan-status/view-loan-status.component';
import { UploadCollateralComponent } from './upload-collateral/upload-collateral.component';
import { LoanRepaymentHistoryComponent } from './loan-repayment-history/loan-repayment-history.component';

import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   
    ApplyForLoanComponent,
    ViewLoanStatusComponent,
    UploadCollateralComponent,
    LoanRepaymentHistoryComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class UserModule { }
