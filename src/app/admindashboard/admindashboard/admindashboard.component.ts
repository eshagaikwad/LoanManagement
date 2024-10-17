import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  constructor(private router:Router)
{}
  userName: string | null = ''; // Variable to hold the username
  

  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); // Retrieve username from localStorage
  }

  logout(): void {
    localStorage.clear(); // Clear all local storage data
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
