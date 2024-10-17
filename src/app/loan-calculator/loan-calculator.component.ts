import { Component } from '@angular/core';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrl: './loan-calculator.component.css'
})
export class LoanCalculatorComponent {
  loanAmount: number = 500000;  
  interestRate: number = 7.5;   
  loanTenure: number = 20;      

  get emi(): number {
    const monthlyInterestRate = this.interestRate / 12 / 100;
    const totalMonths = this.loanTenure * 12;
    
  
    const emi = (this.loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) 
                / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    return emi ? parseFloat(emi.toFixed(2)) : 0;
  }
}
