import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collateral } from '../../model/Collateral.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = 'https://localhost:7280/api/CollateralDocument/Upload'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Method to post the Collateral object
  postCollateral(collateral: Collateral): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Send POST request to API endpoint
    return this.http.post<any>(this.apiUrl, collateral, { headers });
  }


  private baseUrl = 'https://localhost:7280/api/CollateralDocument'; // Update with your API endpoint

  getCollateralByApplicationId(applicationId: number): Observable<Collateral> {
    return this.http.get<Collateral>(`${this.baseUrl}/collaterals/${applicationId}`);
  }
}
