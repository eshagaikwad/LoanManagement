import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { ViewCollateralComponent } from './view-collateral/view-collateral.component';
import { ViewRepaymentStatusComponent } from './view-repayment-status/view-repayment-status.component';
import { LoanOfficerdashboardComponent } from './loan-officerdashboard/loan-officerdashboard.component';
import { UploadAnalyticsComponent } from './upload-analytics/upload-analytics.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'',component:LoanOfficerdashboardComponent},

  { path: 'applications', component: ViewApplicationsComponent,
    canActivate: [AuthGuard], 
    data: { role: 'LoanOfficer' }
   },
  { path: 'repayment-status', component: ViewRepaymentStatusComponent,
    canActivate: [AuthGuard], 
    data: { role: 'LoanOfficer' }
   },
  { path: 'collateral', component: ViewCollateralComponent ,
    canActivate: [AuthGuard], 
    data: { role: 'LoanOfficer' }
  },
  {path:'upload-analytics',component:UploadAnalyticsComponent,
    canActivate: [AuthGuard], 
    data: { role: 'LoanOfficer' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerdashboardRoutingModule { }
