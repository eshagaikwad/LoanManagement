import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';
import { AddEligiblityComponent } from './add-eligiblity/add-eligiblity.component';
import { ViewAnalyticsComponent } from './view-analytics/view-analytics.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddLoanOfficerComponent } from './add-loan-officer/add-loan-officer.component';
import { ViewLoanOfficerComponent } from './view-loan-officer/view-loan-officer.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'',component:AdmindashboardComponent},
  { path: 'add-scheme', component: AddSchemeComponent,
    canActivate: [AuthGuard], 
    data: { role: 'Admin' }
   },
  {  
    path: 'view-analytics',  
    component: ViewAnalyticsComponent,  
    canActivate: [AuthGuard], 
    data: { role: 'Admin' } // Expecting Admin role for this route 
  },
  { path: 'add-eligibility', component: AddEligiblityComponent ,
    canActivate: [AuthGuard], 
    data: { role: 'Admin' }
  },
 
  {path:'add-loan-officer',component:AddLoanOfficerComponent,
    canActivate: [AuthGuard], 
    data: { role: 'Admin' }
  },
  {path:'view-loan-officers',component:ViewLoanOfficerComponent,
    canActivate: [AuthGuard], 
    data: { role: 'Admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindashboardRoutingModule { }
