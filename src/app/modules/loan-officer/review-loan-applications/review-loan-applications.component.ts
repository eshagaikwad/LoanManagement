import { Component, OnInit } from '@angular/core';

import { LoanApprovalService } from '../../../services/loan-officer/loan-approval.service';
import { LoanApplicationGet } from '../../../model/loanApplicationGet.model'; 

@Component({
  selector: 'app-review-loan-applications',
  templateUrl: './review-loan-applications.component.html',
  styleUrl: './review-loan-applications.component.css'
})
export class ReviewLoanApplicationsComponent implements OnInit {
  loanApplications: LoanApplicationGet[] = [];
  errorMessage: string = '';

  constructor(private loanApplicationService: LoanApprovalService) { }

  ngOnInit() {
    this.loadLoanApplications();
  }

  loadLoanApplications() {
    this.loanApplicationService.getLoanApplications().subscribe(
      (data: LoanApplicationGet[]) => {
        this.loanApplications = data;
        console.log('Loan Applications:', this.loanApplications);
      },
      error => {
        this.errorMessage = 'Error fetching loan applications.';
        console.error('Error fetching loan applications:', error);
      }
    );
  }
}
