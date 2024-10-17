import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplyForLoanComponent } from './apply-for-loan/apply-for-loan.component';
import { ViewLoanStatusComponent } from './view-loan-status/view-loan-status.component';

const routes: Routes = [

  { path: 'apply-for-loan', component: ApplyForLoanComponent },
  { path: 'loan-status/:id', component: ViewLoanStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
