import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-score',
  templateUrl: './credit-score.component.html',
  styleUrl: './credit-score.component.css'
})
export class CreditScoreComponent {
  income: number | null = null;
  debt: number | null = null;
  history: number | null = null;
  loanAmount: number | null = null;
  creditScore: number | null = null;
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
  calculateScore() {
    // Basic formula to calculate credit score (simplified)
    const incomeFactor = this.income ? this.income * 0.3 : 0; // Use nullish coalescing
    const debtFactor = this.debt ? this.debt * 0.5 : 0; // Use nullish coalescing
    const historyFactor = this.history ? this.history * 0.2 : 0; // Use nullish coalescing
    const loanFactor = this.loanAmount ? this.loanAmount * 0.1 : 0; // Use nullish coalescing

    this.creditScore = Math.max(
      300, // Minimum credit score
      Math.min(850, incomeFactor - debtFactor + historyFactor - loanFactor) // Max score is 850
    );
  }
}
