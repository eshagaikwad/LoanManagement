import { Component } from '@angular/core';
import { LoanApplicationGet} from '../../model/loanApplicationGet.model';
import { LoanApprovalService } from '../../services/loan-officer/loan-approval.service';
import { Router } from '@angular/router';
import { Collateral } from '../../model/Collateral.model';
import { LoanApplication } from '../../model/loanApplication.model';
import { FileUploadService } from '../../services/user/file-upload.service';
import { PageEvent } from '@angular/material/paginator';
import { LoanApplicationView } from '../../model/LoanApplicationView.model';
import { log } from 'console';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],
})
export class ViewApplicationsComponent {
  loanApplications: LoanApplicationGet[] = []; 

  filteredApplications: LoanApplicationGet[] = []; 
  loading: boolean = true; 
  error: string | null = null;
  searchTerm: string = '';

 

  selectedCollateral: Collateral | null = null; 
  showCollateralModal = false; 


  totalItems:number=0;
  pageNumber: number=1;
  pageSize: number=3;
  totalCount: any;

  constructor(
    private loanApplicationService: LoanApprovalService,
    private router: Router,
    private fileUploadService:FileUploadService,
   
  ) {}

  userName: string | null = ''; // Variable to hold the username

  logout(): void {
    localStorage.clear(); // Clear all local storage data
    this.router.navigate(['/home']); // Redirect to the home page
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('officerName');

    this.fetchLoanApplications();
  }
 
  viewDocument(application: LoanApplicationGet): void {
    let hasOpenedWindow = false;

    if (application.documentUrl1) {
        const uniqueUrl1 = `${application.documentUrl1}?t=${new Date().getTime()}`;
        const fileWindow1 = window.open(uniqueUrl1);
        
        if (!fileWindow1) {
            alert('Please allow popups for this website');
        } else {
            hasOpenedWindow = true;
        }
    }

    if (application.documentUrl2) {
        const uniqueUrl2 = `${application.documentUrl2}?t=${new Date().getTime()}`;
        const fileWindow2 = window.open(uniqueUrl2);
        
        if (!fileWindow2) {
            alert('Please allow popups for this website');
        } else {
            hasOpenedWindow = true;
        }
    }

    if (!hasOpenedWindow) {
        console.error('No document available for this application.');
        alert('No document available for this application.');
    }
}
fetchLoanApplications(): void {
  const userId = localStorage.getItem('officerId');
  if (userId) {
    this.loading = true; // Start loading

    // Fetch the paginated loan applications from the service
    this.loanApplicationService.getLoanApplicationsd(this.pageNumber, this.pageSize).subscribe(
      (response: LoanApplicationView) => {
        // Extract the total count for pagination
        console.log(response);
        
        this.totalCount = response.totalCount;
        this.loanApplications=response.data;


        // Filter applications based on the officer ID
        this.loanApplications = response.data.filter(
          (app) => Number(app.loanOfficerId) === Number(userId)
        );

        // Store filtered loan applications to be displayed
        this.filteredApplications = this.loanApplications;

        // Log the filtered applications (for debugging)
        console.log('Filtered Applications:', this.filteredApplications);

        this.loading = false; // Stop loading after fetching
      },
      (error) => {
        this.error = 'Failed to load loan applications.'; // Handle error
        console.error('Error fetching loan applications:', error);
        this.loading = false; // Stop loading in case of error
      }
    );
  } else {
    this.error = 'User ID not found in local storage.'; // Handle case when no userId is found
    this.loading = false; // Stop loading
  }
}
onPageChange(event: PageEvent): void {
  this.pageNumber = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  this.fetchLoanApplications();

 
}



  filterApplications(): void {
    this.filteredApplications = this.loanApplications.filter((app) => {
      return (
        app.loanApplicationId.toString().includes(this.searchTerm) ||
        app.loanStatus?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        app.nomineeName
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        app.documentVerificationStatus
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        app.ifscCode?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        app.loanAmount?.toString().includes(this.searchTerm)
      );
    });
  }

  approveLoan(applicationId: number): void {
    this.loanApplicationService.updateLoanApplication(applicationId).subscribe(
      (response) => {
        console.log('Loan application approved successfully:', response);
        this.fetchLoanApplications();

        this.loanApplicationService.createLoanRepay(applicationId).subscribe(
          (repaymentResponse) => {
            console.log(repaymentResponse);
            
            console.log('Repayment posted successfully:', repaymentResponse);
          },
          (repaymentError) => {
            console.error('Error posting repayment:', repaymentError);
          }
        );
      },
      (error) => {
        console.error('Error approving loan application:', error);
      }
    );
  }
  rejectLoan(applicationId: number): void {
    // Find the application by its ID
   this.loanApplicationService.rejectLoanApplication(applicationId).subscribe(
    (response)=>{
      console.log("reject loan aapliaction",response);
      this.fetchLoanApplications();
    },
    (error) => {
      console.error('Error approving loan application:', error);
    }
   )
  }
  
  
  
  ViewCollateral1(application: LoanApplicationGet) {
    this.fileUploadService.getCollateralByApplicationId(application.loanApplicationId)
      .subscribe(collateral => {
        if (collateral) {
          // Here, we expect collateral.base64FileContent to be in the format you provided.
          if (collateral.base64FileContent.startsWith('data:application/pdf;base64,')) {
            // Trim the prefix to extract the URL
            collateral.base64FileContent = collateral.base64FileContent.replace('data:application/pdf;base64,', '');
          }
  
          this.selectedCollateral = collateral; // Store retrieved collateral document
          this.showCollateralModal = true; // Show the collateral documents modal
        } else {
          console.error('No collateral document available.');
        }
      }, error => {
        console.error('Error fetching collateral document:', error);
      });
  }
  
  
  
  
  



  closeCollateral() {
    this.showCollateralModal = false; // Close the collateral document view
  }
}
