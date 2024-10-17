import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminAnalytics } from '../../model/AdminAnalyticsGet.model';

@Injectable({
  providedIn: 'root'
})
export class ReportingAndAnalyticsService {

  private analyticsUrl='https://localhost:7280/api/AdminAnalytics';
  constructor(private http: HttpClient) { }
 
  // getanalysis(): Observable<any[]> {

  //   return this.http.get<any[]>(this.analyticsUrl);
  // }


  getanalysis(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<any>(this.analyticsUrl, { headers });
  }
  // Create a new analytics record
  public createAnalytics(adminAnalytics: AdminAnalytics): Observable<AdminAnalytics> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<AdminAnalytics>(this.analyticsUrl, adminAnalytics, { headers })
      .pipe(catchError(this.handleError));
  }

  // Handle error
  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(error);
  }
}
