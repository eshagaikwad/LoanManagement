import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanApplicationManagementService } from '../../../services/user/loan-application-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-for-loan',
  templateUrl: './apply-for-loan.component.html',
  styleUrls: ['./apply-for-loan.component.css'],
})

export class ApplyForLoanComponent implements OnInit {
// Form and data variables
loanApplicationForm!: FormGroup;
loanRepaymentForm!: FormGroup;
selectedFile1: File | null = null;
selectedFile2: File | null = null;

// New property for document URL
documentUrl1: string | null = null;
documentUrl2: string | null = null;
collateralId: number = 123; // Example collateral ID
loanApplicationId: number = 456;
constructor(
  private modalService: NgbModal,
  private loanApplicationService: LoanApplicationManagementService,
  private formBuilder: FormBuilder,
  private route: Router
) {}

ngOnInit(): void {
  this.initForms();
}

// Initialize forms
initForms(): void {
  this.loanApplicationForm = this.formBuilder.group({
    LoanAmount: ['', [Validators.required, Validators.min(1000), Validators.max(1000000)]], // Min and Max validation
    UserAddress: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
    NomineeName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    NomineePhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10-digit phone number validation
    BankAccountNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(18)]], // Example for bank account number
    BankName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    IFSCCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]], // IFSC code format validation
    DocumentType1: ['', Validators.required],
    DocumentType2: ['', Validators.required],
  });

  this.loanRepaymentForm = this.formBuilder.group({
    PaymentAmount: ['', [Validators.required, Validators.min(10)]],
    PaymentMethod: ['', Validators.required],
  });
}

// File selection
onFileSelected(event: Event, fileIndex: number): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    if (fileIndex === 1) {
      this.selectedFile1 = selectedFile;
      this.documentUrl1 = URL.createObjectURL(this.selectedFile1);
    } else if (fileIndex === 2) {
      this.selectedFile2 = selectedFile;
      this.documentUrl2 = URL.createObjectURL(this.selectedFile2);
    }
  }
}

isImage(url: string | null | undefined): boolean {
  if (!url) return false; // Return false if the URL is null or undefined
  return url.startsWith('data:image/');
}
// Convert file to Base64
private convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async submitLoanApplication(): Promise<void> {
  if (this.loanApplicationForm.valid) {
    const loanApplicationData = { ...this.loanApplicationForm.value };

    const currentUrl = window.location.href;

    // Create a URL object
    const urlObj = new URL(currentUrl);
    
    // Get the schemeId parameter
    const loanSchemeId = urlObj.searchParams.get('schemeId');
    
    console.log('Loan Scheme ID:', loanSchemeId);

    // Get the userId from local storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      loanApplicationData.UserId = Number(userId); // Convert to number if needed
    } else {
      console.error('User ID not found in local storage.');
      return;
    }

    // Randomly assign officerId (Assuming you have a predefined list of officer IDs)
    const officerIds = [1, 2, 3,4,5]; // Example officer IDs
    loanApplicationData.LoanOfficerId = officerIds[Math.floor(Math.random() * officerIds.length)];

    // Handle file upload if any
    if (this.selectedFile1) {
      try {
        const base64File = await this.convertFileToBase64(this.selectedFile1);
        loanApplicationData.Base64FileContent1 = base64File;
        loanApplicationData.FileName1 = this.selectedFile1.name;

        if (this.selectedFile2) {  // <== If second file exists
          const base64File2 = await this.convertFileToBase64(this.selectedFile2);  // <== Base64 conversion for second file
          loanApplicationData.Base64FileContent2 = base64File2;
          loanApplicationData.FileName2 = this.selectedFile2.name;
        }

        loanApplicationData.loanSchemeId = loanSchemeId;

      } catch (error) {
        console.error("Error converting file to base64:", error);
        return;
      }
    }

    console.log('Loan Application Data:', loanApplicationData);
    // Submit the loan application
    this.loanApplicationService.createLoanApplication(loanApplicationData).subscribe(
      (response) => {
        console.log('Loan Application created successfully:', response);
        this.loanApplicationForm.reset(); 
        this.loanRepaymentForm.reset();
        this.selectedFile1 = null; 
        this.selectedFile2 = null;
        this.documentUrl1 = null; 
        this.documentUrl2 = null; // Resetting documentUrl2
      },
      (error) => {
        let errorMessage = 'Unknown error';
        if (error.error) {
          errorMessage = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
          console.log('Raw error response:', errorMessage);
        }
        console.error('Error creating Loan Application:', error);
      }
    );
  }
}

// Check if the file is accepted
isFileAccepted(file: File): boolean {
  // Define accepted file type and maximum file size (in bytes)
  const acceptedFileTypes = ['image/png']; // Only PNG accepted
  const maxFileSize = 5 * 1024 * 1024; // 5 MB limit

  // Check the file type
  const isTypeAccepted = acceptedFileTypes.includes(file.type);
  // Check the file size
  const isSizeAccepted = file.size <= maxFileSize;

  // Return true if both type and size are acceptable
  return isTypeAccepted && isSizeAccepted;
}

// Open credit score modal
openCreditScoreModal(content: any): void {
  this.modalService.open(content, { size: 'lg', centered: true });
}

clickme(): void {
  this.route.navigate(['/dashboard']);
}
}
