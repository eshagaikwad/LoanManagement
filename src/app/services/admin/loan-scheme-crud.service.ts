import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanScheme } from '../../model/loan-scheme.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Eligiblity } from '../../model/eligiblity.model';

@Injectable({
  providedIn: 'root'
})
export class LoanSchemeCrudService {

  private loanSchemeUrl = 'https://localhost:7280/api/LoanScheme'; 
  private eligiblityUrl = 'https://localhost:7280/api/EligibilityCriteria';

  constructor(private http: HttpClient) {}

  // Function to print token to the console
  private printToken(): void {
    const token = localStorage.getItem('token'); // Get the token from local storage
    console.log("Token:", token); // Print it to the console
  }

  // Create a new Loan Scheme
  public CreateLoanScheme(loanScheme: LoanScheme): Observable<LoanScheme> {
    const dataUrl = `${this.loanSchemeUrl}`;
    this.printToken(); 
    
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Specify content type as JSON
    });

    return this.http.post<LoanScheme>(dataUrl, loanScheme, { headers })
      .pipe(catchError(this.handleError));
  }
  
  // Create new Eligibility Criteria
  public CreateEligiblityCriteria(eligibility: Eligiblity): Observable<Eligiblity> {
    const dataUrl = `${this.eligiblityUrl}`;
    this.printToken(); 

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Specify content type as JSON
    });

    return this.http.post<Eligiblity>(dataUrl, eligibility, { headers })
      .pipe(catchError(this.handleError));
  }
 
  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 401) {
      errorMessage = 'Unauthorized: Invalid or expired token';
    } else if (error.status === 0) {
      errorMessage = 'Network error or CORS issue';
    } else {
      errorMessage = `Server Error (Status: ${error.status}): ${error.message}`;
    }
    return throwError(errorMessage);
  }



  private baseUrl = 'https://localhost:7280/api/LoanScheme';



  UpdateLoanScheme(id: number, loanScheme: LoanScheme): Observable<LoanScheme> {
    return this.http.put<LoanScheme>(`${this.baseUrl}/${id}`, loanScheme);
  }

  // Method to delete a LoanScheme
  DeleteLoanScheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }




}
