import { Component, OnInit } from '@angular/core';
import { LoanSchemeCrudService } from '../../services/admin/loan-scheme-crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanScheme } from '../../model/loan-scheme.model';
import { Router } from '@angular/router';
import { LoanApplicationManagementService } from '../../services/user/loan-application-management.service';
import { log } from 'console';

@Component({
  selector: 'app-add-scheme',
  templateUrl: './add-scheme.component.html',
  styleUrls: ['./add-scheme.component.css'] // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class AddSchemeComponent implements OnInit {
  loanSchemeForm: FormGroup;
  errorMessage: string | null = null; // Initialize error message
  successMessage: string | null = null; // Initialize success message
  submitted = false; // Track form submission
  activeLoanSchemes: LoanScheme[] = []; // To hold the list of loan schemes
  selectedLoanSchemeId: number | null = null; // To track the selected loan scheme ID for update
  userName: string | null = '';
  constructor(private fb: FormBuilder, private loanSchemeService: LoanSchemeCrudService, private router: Router,
    private scheme:LoanApplicationManagementService
  ) {
    this.loanSchemeForm = this.fb.group({
      loanSchemeName: ['', [Validators.required]],
      loanType: ['', [Validators.required]],
      maxAmount: [null, [Validators.required, Validators.min(1)]],
      interestRate: [null, [Validators.required, Validators.min(0)]],
      tenure: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); 
    this.fetchLoanSchemes(); // Fetch loan schemes on initialization
  }
  logout(): void {
    localStorage.clear(); // Clear all local storage data
    this.router.navigate(['/home']); // Redirect to the login page
  }

  fetchLoanSchemes(): void {
    this.scheme.getLoanSchemes().subscribe(
        (schemes: LoanScheme[]) => {
            console.log(schemes);
            
            this.activeLoanSchemes = schemes.filter(scheme => scheme.isActive); 
            
            
        },
        error => {
            console.error('Error fetching loan schemes', error);
        }
    );
}

  onSubmit(): void {
    this.submitted = true; // Set submitted flag to true
    this.errorMessage = null;
    this.successMessage = null;

    if (this.loanSchemeForm.valid) {
      const loanScheme: LoanScheme = {
        loanSchemeId: this.selectedLoanSchemeId ?? 0, // Use the selected ID for updating
        loanSchemeName: this.loanSchemeForm.value.loanSchemeName,
        loanType: this.loanSchemeForm.value.loanType,
        maxAmount: this.loanSchemeForm.value.maxAmount,
        interestRate: this.loanSchemeForm.value.interestRate,
        tenure: this.loanSchemeForm.value.tenure,
        isActive:true
      };

      if (this.selectedLoanSchemeId) {
        // Update loan scheme if ID is set
        this.loanSchemeService.UpdateLoanScheme(this.selectedLoanSchemeId, loanScheme).subscribe(
          response => {
            console.log('Loan Scheme Updated', response);
            this.successMessage = 'Loan Scheme Updated Successfully!';
            this.fetchLoanSchemes(); // Refresh loan schemes after update
            this.resetForm(); // Reset form after success
          },
          error => {
            console.error('Error updating loan scheme', error);
            this.errorMessage = 'Error updating loan scheme. Please try again.';
          }
        );
      } else {
        // Create new loan scheme if no ID is set
        this.loanSchemeService.CreateLoanScheme(loanScheme).subscribe(
          response => {
            console.log('Loan Scheme Created', response);
            this.successMessage = 'Loan Scheme Created Successfully!';
            this.fetchLoanSchemes(); // Refresh loan schemes after creation
            this.resetForm(); // Reset form after success
          },
          error => {
            console.error('Error creating loan scheme', error);
            this.errorMessage = 'Error creating loan scheme. Please try again.';
          }
        );
      }
    } else {
      console.log('Form is not valid');
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  deleteLoanScheme(id: number): void {
    this.loanSchemeService.DeleteLoanScheme(id).subscribe(
      response => {
        console.log('Loan Scheme Deleted', response);
        this.successMessage = 'Loan Scheme Deleted Successfully!';
        this.fetchLoanSchemes(); // Refresh loan schemes after deletion
      },
      error => {
        console.error('Error deleting loan scheme', error);
        this.errorMessage = 'Error deleting loan scheme. Please try again.';
      }
    );
  }

  resetForm(): void {
    this.loanSchemeForm.reset();
    this.submitted = false;
    this.selectedLoanSchemeId = null; // Clear the selected ID for creating a new scheme
  }

  // Method to select a loan scheme for editing
  selectLoanScheme(scheme: LoanScheme): void {
    this.loanSchemeForm.patchValue(scheme); // Fill the form with the selected scheme data
    this.selectedLoanSchemeId = scheme.loanSchemeId; // Set the selected ID for updates
  }




  
}
