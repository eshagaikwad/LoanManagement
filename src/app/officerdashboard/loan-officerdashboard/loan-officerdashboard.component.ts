import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-officerdashboard',
  templateUrl: './loan-officerdashboard.component.html',
  styleUrl: './loan-officerdashboard.component.css'
})
export class LoanOfficerdashboardComponent {
  constructor(private router:Router)
  {}
    userName: string | null = ''; // Variable to hold the username
  
    ngOnInit(): void {
      this.userName = localStorage.getItem('officerName'); // Retrieve username from localStorage
    }
  
    logout(): void {
      localStorage.clear(); // Clear all local storage data
      this.router.navigate(['/home']); // Redirect to the login page
    }
}
