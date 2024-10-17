import { Component } from '@angular/core';
import { LoanOfficerCrudService } from '../../services/admin/loan-officer-crud.service';
import { LoanOfficerAdd } from '../../model/LoanOfficerAdd';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-loan-officer',
  templateUrl: './view-loan-officer.component.html',
  styleUrls: ['./view-loan-officer.component.css']
})
export class ViewLoanOfficerComponent {
  page: number = 1;
  pageSize: number = 3;
  loanOfficers: LoanOfficerAdd[] = [];
  filteredLoanOfficers: LoanOfficerAdd[] = []; // Filtered list
  searchTerm: string = ''; // Holds the search query
  errorMessage: string | null = null;

  constructor(private loanOfficerService: LoanOfficerCrudService, private router: Router) {}

  userName: string | null = '';

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.fetchLoanOfficers();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLoanOfficers.length / this.pageSize);
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  get paginatedLoanOfficers(): LoanOfficerAdd[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredLoanOfficers.slice(start, start + this.pageSize);
  }

  fetchLoanOfficers(): void {
    this.loanOfficerService.getLoanOfficer().pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load loan officers. Please try again.';
        console.error('Error fetching loan officers', error);
        return of([]);
      })
    ).subscribe(data => {
      this.loanOfficers = data;
      this.filteredLoanOfficers = this.loanOfficers; // Initialize filtered list
    });
  }

  searchLoanOfficers(): void {
    
    this.filteredLoanOfficers = this.loanOfficers.filter(officer =>
      officer.isActive.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      officer.loanOfficerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      officer.loanOfficerEmail.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      officer.loanOfficerPhone.includes(this.searchTerm)
    
    );
    this.page = 1; // Reset to the first page after search
  }

  deleteOfficer(loanOfficerId: number): void {
    this.confirmDeletion(loanOfficerId);
  }

  confirmDeletion(loanOfficerId: number): void {
    this.loanOfficerService.deleteLoanOfficer(loanOfficerId).pipe(
      catchError(error => {
        this.errorMessage = 'Failed to delete loan officer. Please try again.';
        console.error('Error deleting loan officer:', error);
        return of(null);
      })
    ).subscribe(response => {
      if (response !== null) {
        this.fetchLoanOfficers();
      }
    });
  }
}
