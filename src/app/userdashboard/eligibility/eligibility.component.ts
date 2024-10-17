import { Component } from '@angular/core';
import { Eligiblity } from '../../model/eligiblity.model'; // Corrected spelling
import { LoanApplicationManagementService } from '../../services/user/loan-application-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.css']
})
export class EligibilityComponent {
  page: number = 1;
  pageSize: number = 3;
  eligibilityCriteria: Eligiblity[] = []; // Corrected spelling
  searchTerm: string = '';
  userName: string | null = '';

  constructor(private userService: LoanApplicationManagementService, private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.getEligibilityCriteria();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEligibilityCriteria.length / this.pageSize);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  getEligibilityCriteria(): void {
    this.userService.getEligibilityCriteria().subscribe(
      (data: Eligiblity[]) => {
        this.eligibilityCriteria = data;
      },
      (error) => {
        console.error('Error fetching eligibility criteria:', error);
      }
    );
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  get paginatedLoanSchemes(): Eligiblity[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredEligibilityCriteria.slice(start, start + this.pageSize);
  }

  get filteredEligibilityCriteria(): Eligiblity[] {
    return this.eligibilityCriteria.filter(criteria => 
      criteria.minimumIncome.toString().includes(this.searchTerm) ||
      criteria.minimumAge.toString().includes(this.searchTerm) ||
      criteria.maximumAge.toString().includes(this.searchTerm) ||
      criteria.minimumCreditScore.toString().includes(this.searchTerm) ||
      criteria.employmentYears.toString().includes(this.searchTerm) ||
      criteria.documents.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
