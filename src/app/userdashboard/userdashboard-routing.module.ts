import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EligibilityComponent } from './eligibility/eligibility.component';
import { LoanSchemeComponent } from './loan-scheme/loan-scheme.component';
import { RepaymentComponent } from './repayment/repayment.component';
import { LoanStatusComponent } from './loan-status/loan-status.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { CreditScoreComponent } from './credit-score/credit-score.component';
import { AuthGuard } from '../auth.guard';
import { UploadCollateralComponent } from './upload-collateral/upload-collateral.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // { path: 'eligibility', component: EligibilityComponent },
  {  
    path: 'eligibility',  
    component: EligibilityComponent,  
    canActivate: [AuthGuard], 
    data: { role: 'User' } // Expecting User role for this route 
  },
  { path: 'loan-scheme', 
    component: LoanSchemeComponent,
    canActivate: [AuthGuard], 
    data: { role: 'User' }
   },
  { path: 'repayment/:id', 
    component: RepaymentComponent ,
    canActivate: [AuthGuard], 
    data: { role: 'User' }
  },
  { path: 'loanStatus', component: LoanStatusComponent,
    canActivate: [AuthGuard], 
    data: { role: 'User' }
   },
  {path:'loanCalculator',component:LoanCalculatorComponent,
    canActivate: [AuthGuard], 
    data: { role: 'User' }
  },
  {path:'creditScore',component:CreditScoreComponent,
    canActivate: [AuthGuard], 
    data: { role: 'User' }
  },
  {
    path:'collateral/:loanApplicationId',component:UploadCollateralComponent,
    canActivate: [AuthGuard], 
    data: { role: 'User' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdashboardRoutingModule { }
