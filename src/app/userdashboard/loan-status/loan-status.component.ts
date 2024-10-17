import { Component, OnInit } from '@angular/core';
import { LoanApprovalService } from '../../services/loan-officer/loan-approval.service';
import { LoanApplicationGet } from '../../model/loanApplicationGet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplicationView } from '../../model/LoanApplicationView.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent implements OnInit { // Implement OnInit
  loanApplications: LoanApplicationGet[] = []; 
  page: number = 1;
  pageSize: number = 4;// Array to hold loan applications
  loading: boolean = true; // For loading state
  error: string | null = null; // For error handling
  searchTerm: string = '';
  constructor(private loanApplicationService: LoanApprovalService,private router:Router, private route: ActivatedRoute) {}

    userName: string | null = ''; // Variable to hold the username
  
 
  
    logout(): void {
      localStorage.clear(); // Clear all local storage data
      this.router.navigate(['/home']); // Redirect to the login page
    }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); 
    this.fetchLoanApplications();
  }
  get totalPages(): number {
    return Math.ceil(this.loanApplications.length / this.pageSize);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }


  fetchLoanApplications(): void {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

    if (userId) {
      this.loanApplicationService.getLoanApplications().subscribe(
        (applications: LoanApplicationGet[]) => {
          // Filter applications by userId
          this.loanApplications = applications.filter(app => app.userId === Number(userId));
          this.loading = false; // Stop loading
        },
        (error) => {
          this.error = 'Failed to load loan applications.'; // Handle error
          console.error('Error fetching loan applications:', error);
          this.loading = false; // Stop loading
        }
      );
    } else {
      this.error = 'User ID not found in local storage.'; // Handle missing userId
      this.loading = false; // Stop loading
    }
  }
  get filteredLoanApplications(): LoanApplicationGet[] {
    if (!this.searchTerm) {
      return this.loanApplications; // Return all applications if search term is empty
    }
    const searchLower = this.searchTerm.toLowerCase(); // Convert search term to lowercase
    return this.loanApplications.filter(application => 
      String(application.loanApplicationId).includes(searchLower) ||
      (application.applicationDate && application.applicationDate.toString().includes(searchLower)) ||
      String(application.loanAmount).includes(searchLower) ||
      application.loanStatus?.toLowerCase().includes(searchLower) ||
      application.documentVerificationStatus?.toLowerCase().includes(searchLower) ||
      (application.repaymentStartDate && application.repaymentStartDate.toString().includes(searchLower)) ||
      application.userAddress.toLowerCase().includes(searchLower) ||
      application.documentFileName1?.toLowerCase().includes(searchLower) ||
      application.nomineeName.toLowerCase().includes(searchLower)
    );
  }
  
  get paginatedLoanSchemes(): LoanApplicationGet[] {
    const filteredApps = this.filteredLoanApplications; // Apply the search filter
    const start = (this.page - 1) * this.pageSize;
    return filteredApps.slice(start, start + this.pageSize); // Paginate the filtered data
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

  isImage(url: string): boolean {
    return url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.gif');
  }

  
}
