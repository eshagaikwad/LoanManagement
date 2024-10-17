import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router:Router)
{}
  userName: string | null = ''; // Variable to hold the username

  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); // Retrieve username from localStorage
  }

  logout(): void {
    localStorage.clear(); // Clear all local storage data
    this.router.navigate(['/home']); // Redirect to the login page
  }
}
