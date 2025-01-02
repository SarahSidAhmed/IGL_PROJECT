import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationListService {

  private baseUrl = 'http://127.0.0.1:8000/api'; // Base URL for the API

  constructor(private http: HttpClient) {}

  getConsultations(dpiId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/consultation/all/${dpiId}`);
  }
}