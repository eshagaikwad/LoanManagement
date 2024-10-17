import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanOfficerCrudService } from '../../services/admin/loan-officer-crud.service';
import { LoanOfficerAdd } from '../../model/LoanOfficerAdd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-loan-officer',
  templateUrl: './add-loan-officer.component.html',
  styleUrl: './add-loan-officer.component.css'
})
export class AddLoanOfficerComponent implements OnInit {
  loanOfficerForm: FormGroup;
  errorMessage: string | null = null; // Initialize error message
  successMessage: string | null = null; // Initialize success message

  constructor(private fb: FormBuilder, private loanOfficerService: LoanOfficerCrudService,private router:Router) {
    this.loanOfficerForm = this.fb.group({
      loanOfficerName: ['', [Validators.required]],
      loanOfficerEmail: ['', [Validators.required, Validators.email]],
      loanOfficerPassword: ['', [Validators.required, Validators.minLength(6)]],
      loanOfficerPhone: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
 
    userName: string | null = ''; // Variable to hold the username
  

  
    logout(): void {
      localStorage.clear(); // Clear all local storage data
      this.router.navigate(['/home']); // Redirect to the login page
    }
  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    console.log("AddLoanOfficerComponent initialized");
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.loanOfficerForm.valid) {
      const loanOfficer: LoanOfficerAdd = {
        loanOfficerId: 0, // This will be auto-generated on the server side
        loanOfficerName: this.loanOfficerForm.value.loanOfficerName,
        loanOfficerEmail: this.loanOfficerForm.value.loanOfficerEmail,
        loanOfficerPassword: this.loanOfficerForm.value.loanOfficerPassword,
        loanOfficerPhone: this.loanOfficerForm.value.loanOfficerPhone,
        isActive:true
      };

      this.loanOfficerService.CreateLoanOfficer(loanOfficer).subscribe(
        response => {
          console.log('Loan Officer Created', response);
          this.successMessage = 'Loan Officer added successfully!';
          this.loanOfficerForm.reset(); // Optionally reset the form after success
        },
        error => {
          console.error('Error creating loan officer', error);
          this.errorMessage = 'Error creating loan officer. Please try again.'; // Set error message on failure
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.'; // Form validation error message
    }
  }
}
