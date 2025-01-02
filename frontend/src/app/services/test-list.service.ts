import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestListService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getExams(dpiId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dpis/${dpiId}/exams`);
  }
}
