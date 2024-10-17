import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanSchemeCrudService } from '../../services/admin/loan-scheme-crud.service';
import { Eligiblity } from '../../model/eligiblity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-eligiblity',
  templateUrl: './add-eligiblity.component.html',
  styleUrls: ['./add-eligiblity.component.css'] // Corrected to `styleUrls`
})
export class AddEligiblityComponent implements OnInit {
  eligibilityForm: FormGroup;
  errorMessage: string | null = null; // Initialize error message
  successMessage: string | null = null; // Initialize success message
  userName: string | null = ''; // Variable to hold the username

  constructor(
    private fb: FormBuilder,
    private eligibilityService: LoanSchemeCrudService,
    private router: Router
  ) {
    this.eligibilityForm = this.fb.group({
      minimumIncome: [null, [Validators.required, Validators.min(0)]],
      minimumAge: [null, [Validators.required, Validators.min(18)]],
      maximumAge: [null, [Validators.required, Validators.min(18)]],
      minimumCreditScore: [null, [Validators.required, Validators.min(300), Validators.max(850)]],
      employmentYears: [null, [Validators.required, Validators.min(0)]],
      documents: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
  }

  logout(): void {
    localStorage.clear(); // Clear all local storage data
    this.router.navigate(['/home']); // Redirect to the login page
  }

  onSubmit(): void {
    // Reset messages before a new submission
    this.errorMessage = null;
    this.successMessage = null;

    if (this.eligibilityForm.valid) {
      const eligibility: Eligiblity = {
        eligibilityCriteriaId: 0, // Assuming this is auto-generated on the server-side
        minimumIncome: this.eligibilityForm.value.minimumIncome,
        minimumAge: this.eligibilityForm.value.minimumAge,
        maximumAge: this.eligibilityForm.value.maximumAge,
        minimumCreditScore: this.eligibilityForm.value.minimumCreditScore,
        employmentYears: this.eligibilityForm.value.employmentYears,
        documents: this.eligibilityForm.value.documents
      };

      this.eligibilityService.CreateEligiblityCriteria(eligibility).subscribe(
        response => {
          console.log('Eligibility Criteria Created', response);
          this.successMessage = 'Eligibility Criteria Created Successfully!'; // Set success message
          this.eligibilityForm.reset(); // Optionally reset the form after success
        },
        error => {
          console.error('Error creating eligibility criteria', error);
          this.errorMessage = 'Error creating eligibility criteria. Please try again.'; // Set error message
        }
      );
    } else {
      console.log('Form is not valid');
      this.errorMessage = 'Please fill out all required fields.'; // Set error message for invalid form
    }
  }
}
