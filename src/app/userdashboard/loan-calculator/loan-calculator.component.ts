import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LoanCalculatorComponent {
  emiCalculatorForm: FormGroup;
  loanAmount: number = 10000; // Default values
  interestRate: number = 1;    // Default values
  loanTenure: number = 1;      // Default values
  emi: number | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  userName: string | null = ''; // Variable to hold the username

  constructor(private router: Router, private fb: FormBuilder) {
    this.emiCalculatorForm = this.fb.group({
      loanAmount: [this.loanAmount, [Validators.required, Validators.min(10000)]],
      interestRate: [this.interestRate, [Validators.required, Validators.min(1)]],
      loanTenure: [this.loanTenure, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); // Retrieve username from localStorage
  }

  logout(): void {
    localStorage.clear(); // Clear all local storage data
    this.router.navigate(['/home']); // Redirect to the login page
  }

  calculateEMI() {
    const principal = this.emiCalculatorForm.get('loanAmount')?.value; // Use 'loanAmount'
    const annualRate = this.emiCalculatorForm.get('interestRate')?.value;
    const tenureYears = this.emiCalculatorForm.get('loanTenure')?.value; // Use 'loanTenure'

    if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
      this.errorMessage = 'Please provide valid inputs for loan amount, interest rate, and tenure.';
      return;
    }

    const monthlyRate = annualRate / (12 * 100);
    const tenureMonths = tenureYears * 12;

    // Calculate EMI
    this.emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    // Format the success message
    this.successMessage = `Your EMI is: ${this.emi.toFixed(2)}`;
    this.errorMessage = ''; // Clear any previous error messages
  }
}
