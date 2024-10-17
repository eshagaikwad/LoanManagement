import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { LendComponent } from './modules/auth/lend/lend.component';


import { LoanOfficerdashboardComponent } from './officerdashboard/loan-officerdashboard/loan-officerdashboard.component';
import { ViewApplicationsComponent } from './officerdashboard/view-applications/view-applications.component';
import { AddEligiblityComponent } from './admindashboard/add-eligiblity/add-eligiblity.component';
import { AddSchemeComponent } from './admindashboard/add-scheme/add-scheme.component';
import { AddLoanOfficerComponent } from './admindashboard/add-loan-officer/add-loan-officer.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard/admindashboard.component';
import { UploadAnalyticsComponent } from './officerdashboard/upload-analytics/upload-analytics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  {
    path:'home',component:HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent 
  },
  {
    path:'lend',
    component:LendComponent

  },
  { path: 'loan-calculator', component: LoanCalculatorComponent },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  // },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'loan-officer',
    loadChildren: () => import('./officerdashboard/officerdashboard.module').then(m => m.OfficerdashboardModule)
  },


  { path: 'dashboard', loadChildren: () => import('./userdashboard/userdashboard.module').then(m => m.UserdashboardModule)
   },

  {
    path:'add-eligibility',component:AddEligiblityComponent


  },
  {
    path: 'officer',
    loadChildren: () => import('./officerdashboard/officerdashboard.module').then(m => m.OfficerdashboardModule) // Add this line
  },

  {
    path: 'admin',  // Change this path as needed
    loadChildren: () => import('./admindashboard/admindashboard.module').then(m => m.AdmindashboardModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
