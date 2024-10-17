import { Component } from '@angular/core';
import { AdminAnalytics } from '../../model/AdminAnalyticsGet.model';
import { ReportingAndAnalyticsService } from '../../services/admin/reporting-and-analytics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-analytics',
  templateUrl: './upload-analytics.component.html',
  styleUrl: './upload-analytics.component.css'
})
export class UploadAnalyticsComponent {
  adminAnalytics: AdminAnalytics = {
    analyticsId : 0,
    applicationsCount: 0,
    approvedLoansCount: 0,
    rejectedLoansCount: 0,
    totalLoanAmount: 0,
    totalRepaymentCollected: 0,
    reportDate: new Date(),
    loanSchemeId: 0
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private adminAnalyticsService: ReportingAndAnalyticsService,private router:Router) {}
  
    userName: string | null = ''; // Variable to hold the username
  
    ngOnInit(): void {
      this.userName = localStorage.getItem('officerName'); // Retrieve username from localStorage
    }
  
    logout(): void {
      localStorage.clear(); // Clear all local storage data
      this.router.navigate(['/home']); // Redirect to the login page
    }
  onSubmit() {
    this.adminAnalyticsService.createAnalytics(this.adminAnalytics)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Analytics data created successfully!';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Failed to create analytics data. Please try again.';
          this.successMessage = '';
        }
      });
  }
}
