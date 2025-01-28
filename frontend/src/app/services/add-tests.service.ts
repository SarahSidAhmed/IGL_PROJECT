import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTestsService {

  private baseUrl = 'http://127.0.0.1:8000/api'; // Replace with your API base URL
      constructor(private http: HttpClient) {}
      
      
        
      
      addSoin(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/nursing-records/create/`, data);
      }
      addbilan(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/biological-exams/create/`, data);
      }
      addradio(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/radiological-exams/create/`, data);
      }
}
