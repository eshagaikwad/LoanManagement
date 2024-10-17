import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserCheck } from '../../model/UserCheck.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../../model/register.model';
import { loanOfficer } from '../../model/loanOfficer.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private UserApi = "https://localhost:7280/api/User"; 
  private registrationUrl = "https://localhost:7280/api/Authentication/Register";
  private loginUrl = "https://localhost:7280/api/Authentication/Login";
  private loanOfficerUrl="https://localhost:7280/api/Authentication/loginLoanOfficer";

  constructor(private router: Router, private http: HttpClient) {}

  GenerateRegistration(scheme: Register): Observable<Register> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Register>(this.registrationUrl, scheme, { headers });
  }

  getUsersData(): Observable<any[]> {
    return this.http.get<UserCheck[]>(this.UserApi);
  }

  login(user: UserCheck): Observable<any> {
    return this.http.post(`${this.loginUrl}`, user);
  }

  getOfficerLoan(officer:loanOfficer): Observable<any> {
    return this.http.post(`${this.loanOfficerUrl}`, officer);
  }


  redirectBasedOnRole(role: string,id:number) {
    console.log('Redirecting based on role:', role);
    if (role ==="Admin") {
      this.router.navigate(['/admin/manage-loan-schemes']);
    } else if (role === "User") {
      this.router.navigate(['/user/apply-for-loan',id]);
    } else if (role === 'LoanOfficer') {
      this.router.navigate(['/loan-officer/review-loan-applications',id]);
    } else {

      console.error('Unknown role:', role);
      this.router.navigate(['/']); 
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/']); 
  }

  isLoggedInForNav(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getRole(): string | null { 
    const token = localStorage.getItem('token'); 
    console.log(token);
    
    if (!token) { 
      console.error('No token found in localStorage'); 
      return null; 
    } 
   
    const decodedToken = decodeJwt(token); // Use the helper function to decode the token 
    if (decodedToken) { 
      console.log('Decoded Token:', decodedToken); // For debugging 
   
      // Check for role in both places: custom key or default 
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decodedToken['role'] || decodedToken['UserRole']; 
    } 
   
    return null; 
  }

  isLoggedIn(): boolean { 
    
    const token = localStorage.getItem('token'); 
    // Here, you can also check if the token is expired, depending on your JWT implementation. 
    return !!token; // Returns true if token exists, false otherwise 
  }

}

function decodeJwt(token: string): any { 
  if (!token) { 
    console.error('No token provided'); 
    return null; 
  } 
 
  const payload = token.split('.')[1]; // Get the payload part of the JWT 
  if (!payload) { 
    console.error('Invalid token structure'); 
    return null; 
  } 
 
  // Decode Base64 URL-encoded string 
  const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/')); 
 
  try { 
    return JSON.parse(decodedPayload); // Parse JSON string to object 
  } catch (error) { 
    console.error('Error parsing JWT payload:', error); 
    return null; 
  } 
}
