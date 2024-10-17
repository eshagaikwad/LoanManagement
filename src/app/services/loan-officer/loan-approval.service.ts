import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoanApplication } from '../../model/loanApplication.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoanApplicationManagementService } from '../user/loan-application-management.service';
import { LoanApplicationGet} from '../../model/loanApplicationGet.model';
import { log } from 'console';
import { LoanRepayment } from '../../model/GetLoanRepayment.model';
import { LoanApplicationView } from '../../model/LoanApplicationView.model';

@Injectable({
  providedIn: 'root'
})
export class LoanApprovalService {

  private LoanApplicationUrl = 'https://localhost:7280/api/LoanApplication';


  private repaymentUrl="https://localhost:7280/api/LoanRepayment/loanApplicationId";

 

  constructor(private http: HttpClient) { }


  getLoanApplicationsd(page:number,pageSize:number): Observable<LoanApplicationView> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json' 
    });
    const url = `${this.LoanApplicationUrl}?pageNumber=${page}&pageSize=${pageSize}`;
    return this.http.get<LoanApplicationView>(url, { headers }); // Correct URL
    
  }


  private getUrl="https://localhost:7280/api/LoanApplication/getApplications"
  getLoanApplications(): Observable<LoanApplicationGet[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json' 
    });

    return this.http.get<LoanApplicationGet[]>(this.getUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching loan applications:', error);
        return throwError(error); // Return an observable with an error
      })
    );
  }




  private url="https://localhost:7280/api/LoanRepayment";
  getLoanRepayment(loanApplicationId:number): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json' 
    });
    const urll = `${this.url}/${loanApplicationId}`;
    return this.http.get<any[]>(`${urll}`, { headers });
  }


 



  private emiRepaymentUrl = "https://localhost:7280/api/LoanRepayment/PayEMI";
 
  createLoanRepayment(id: number, paymentAmount: number): Observable<LoanRepayment> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Setting the token in the headers
      'Content-Type': 'application/json'  // Ensure content type is JSON
    });
   
    // URL with query parameters for loanApplicationId and paymentAmount
    const url = `${this.emiRepaymentUrl}?loanRepaymentId=${id}&paymentAmount=${paymentAmount}`;
   
    return this.http.post<LoanRepayment>(url,{ headers });
  }



  private repaymentHistoryUrl="https://localhost:7280/api/RepaymentHistory";
  getRepaymentHistory(repaymentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
   
    const url = `${this.repaymentHistoryUrl}/${repaymentId}`;  // Include pagination parameters
   
    return this.http.get<any>(url, { headers });
  }




    // Update loan application details
    updateLoanApplication(applicationId: number): Observable<LoanApplicationGet> {
      const token = localStorage.getItem('token'); 
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
  
      const url = `${this.LoanApplicationUrl}/${applicationId}`;
      console.log(url);
      
      return this.http.put<LoanApplicationGet>(url,  { headers });
    }

    private rejectURL="https://localhost:7280/api/LoanApplication/reject"
      // Update loan application details
      rejectLoanApplication(applicationId: number): Observable<LoanApplicationGet> {
        const token = localStorage.getItem('token'); 
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    
        const url = `${this.rejectURL}/${applicationId}`;
        console.log(url);
        
        return this.http.put<LoanApplicationGet>(url,  { headers });
      }



    postRepayment(loanApplicationId: number): Observable<any> {
      const token = localStorage.getItem('token'); 
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      });
  
      const url = `${this.repaymentUrl}?id=${loanApplicationId}`;
      return this.http.post<any>(url, { headers });
    }


    private createRepaymentUrl = "https://localhost:7280/api/LoanRepayment/createRepayment";

createLoanRepay(applicationId: number): Observable<LoanRepayment> {
  console.log('Sending applicationId:', applicationId);
  
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  // Construct the URL with query parameters
  const url = `${this.createRepaymentUrl}?applicationId=${applicationId}`;
  
  // Send the POST request
  return this.http.post<LoanRepayment>(url, null, { headers });
}

     
}
