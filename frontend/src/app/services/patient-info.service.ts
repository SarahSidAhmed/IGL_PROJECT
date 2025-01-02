import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientInfoService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getDpiById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dpis/${id}`);
  }
}
