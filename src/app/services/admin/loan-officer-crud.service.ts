import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanOfficerAdd } from '../../model/LoanOfficerAdd';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanOfficerCrudService {
 private dataUrl="https://localhost:7280/api/LoanOfficer";

  constructor(private http: HttpClient) {}
 
  public CreateLoanOfficer(loanOfficer: LoanOfficerAdd): Observable<LoanOfficerAdd> {
    const dataUrl = `${this.dataUrl}`;
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });

    return this.http.post<LoanOfficerAdd>(dataUrl, loanOfficer, { headers })
      .pipe(catchError(this.handleError));
  }

  getLoanOfficer(): Observable<LoanOfficerAdd[]> {
    const url = `${this.dataUrl}`;
    return this.http.get<LoanOfficerAdd[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  deleteLoanOfficer(loanOfficerId: number) {
    return this.http.delete(`https://localhost:7280/api/LoanOfficer/${loanOfficerId}`, { responseType: 'json' });
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
}


