import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
interface RadiologicalExamsResponse {
  pages: number;
  results: RadiologicalExam[];
}
interface RadiologicalExam {
  id: number;
  exam_name: string;
  dpi: {
    first_name: string;
    last_name: string;
    birthdate: string;
    gender: string;
  };
  consultation: number;
}
@Injectable({
  providedIn: 'root',
})
export class RadioListService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  searchRadiologicalExams(
    searchQuery: string = ''
  ): Observable<RadiologicalExam[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    console.log('search query: ', searchQuery);

    const params = searchQuery
      ? new HttpParams().set('ssn_prefix', searchQuery)
      : new HttpParams();

    console.log('Request Parameters:', params.toString());

    const url = `${this.baseUrl}/radiological-exams/search/`;
    return this.http
      .get<RadiologicalExam[]>(url, { headers, params })
      ;
  }
}
