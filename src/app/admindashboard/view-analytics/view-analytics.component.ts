import { Component, OnInit } from '@angular/core';
import { ReportingAndAnalyticsService } from '../../services/admin/reporting-and-analytics.service';
import{AdminAnalytics} from '../../model/Analytics.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-analytics',
  templateUrl: './view-analytics.component.html',
  styleUrl: './view-analytics.component.css'
})
export class ViewAnalyticsComponent implements OnInit {
  analyticsData: AdminAnalytics[] = [];
  errorMessage: string | null = null;

  constructor(private analyticsService: ReportingAndAnalyticsService,private router:Router) {}
 
    userName: string | null = ''; // Variable to hold the username
  

  
    logout(): void {
      localStorage.clear(); // Clear all local storage data
      this.router.navigate(['/home']); // Redirect to the login page
    }
  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); 
    this.getAnalyticsData();
  }

  getAnalyticsData(): void {
    this.analyticsService.getanalysis().subscribe(
      (data: AdminAnalytics[]) => {
        this.analyticsData = data;
        console.log(this.analyticsData);
        
      },
      (error) => {
        this.errorMessage = 'Error fetching analytics data';
        console.error(error);
      }
    );
  }
}
