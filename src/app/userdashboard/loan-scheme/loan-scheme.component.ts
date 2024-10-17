import { Component } from '@angular/core';
import { LoanApplicationManagementService } from '../../services/user/loan-application-management.service';
import { Router } from '@angular/router';
import { LoanScheme } from '../../model/loan-scheme.model';

@Component({
  selector: 'app-loan-scheme',
  templateUrl: './loan-scheme.component.html',
  styleUrl: './loan-scheme.component.css'
})
export class LoanSchemeComponent {

  items = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
  page: number = 1;  // current page
  pageSize: number = 3;  // number of items per page
  loanSchemes: LoanScheme[] = [];
  errorMessage: string | undefined;

  constructor(
    private loanService: LoanApplicationManagementService,
    private router: Router
  ) {}
  userName: string | null = ''; // Variable to hold the username
  searchTerm: string = '';

    logout(): void {
      localStorage.clear(); // Clear all local storage data
      this.router.navigate(['/home']); // Redirect to the login page
    }
  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); 
    this.loadLoanSchemes();
  }
  get totalPages(): number {
    return Math.ceil(this.filteredLoanSchemes.length / this.pageSize);
  }
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  // Method to go to the previous page
  previousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }
  loadLoanSchemes(): void {
    this.loanService.getLoanSchemes().subscribe(
      (schemes) => {
        this.loanSchemes = schemes;
      },
      (error) => {
        console.error('Error fetching loan schemes:', error);
        this.errorMessage = 'Could not load loan schemes. Please try again later.';
      }
    );
  }
  get filteredLoanSchemes(): LoanScheme[] {
    return this.loanSchemes.filter(scheme =>
      scheme.loanSchemeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      scheme.loanType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedLoanSchemes(): LoanScheme[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredLoanSchemes.slice(start, start + this.pageSize);
  }
  // Method to navigate to the loan application page
  applyForLoan(schemeId: number): void {
    this.router.navigate(['/user/apply-for-loan'], { queryParams: { schemeId } });
  }
}
