import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAssignedLoansComponent } from './view-assigned-loans/view-assigned-loans.component';
import { ReviewLoanApplicationsComponent } from './review-loan-applications/review-loan-applications.component';
import { VerifyCollateralComponent } from './verify-collateral/verify-collateral.component';

const routes: Routes = [
  { path: 'view-assigned-loans', component: ViewAssignedLoansComponent },
  { path: 'review-loan-applications/:id', component: ReviewLoanApplicationsComponent },
  { path: 'verify-collateral', component: VerifyCollateralComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanOfficerRoutingModule { }
