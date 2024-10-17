import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanApplication } from '../../model/loanApplication.model';


@Injectable({
  providedIn: 'root'
})
export class LoanApplicationManagementService {

  private eligibilityCriteriaUrl = 'https://localhost:7280/api/EligibilityCriteria';
  private loanSchemeUrl = 'https://localhost:7280/api/LoanScheme';

  private LoanApplicationUrl='https://localhost:7280/api/LoanApplication/DTO';

  constructor(private http: HttpClient) {}

  // Get Eligibility Criteria
  getEligibilityCriteria(): Observable<any[]> {
    return this.http.get<any[]>(this.eligibilityCriteriaUrl);
  }


  getLoanSchemes(): Observable<any[]> {
    return this.http.get<any[]>(this.loanSchemeUrl);
  }

  // getLoanSchemes(pageNumber: number, pageSize: number): Observable<any> {
  //   return this.http.get(`${this.loanSchemeUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  // }

  createLoanApplication(LoanApplication:any): Observable<LoanApplication> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
     
      'Authorization': `Bearer ${token}`, // Setting the token in the headers
      'Content-Type': 'application/json' // Ensure content type is JSON
    });

    return this.http.post<LoanApplication>(`${this.LoanApplicationUrl}`, LoanApplication, { headers });
  }
  // createLoanRepayment(LoanRepayment:any): Observable<LoanRepayment> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
     
  //     'Authorization': `Bearer ${token}`, // Setting the token in the headers
  //     'Content-Type': 'application/json' // Ensure content type is JSON
  //   });
 
  //   return this.http.post<LoanRepayment>(`${this.loanRepaymetUrl}`, LoanRepayment, { headers });
  // }
}
