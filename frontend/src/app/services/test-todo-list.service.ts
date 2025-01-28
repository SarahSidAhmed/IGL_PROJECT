import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
interface BiologicalExamResponse {
  pages: number;
  results: BiologicalExam[];
}

interface BiologicalExam {
  id: number;
  exam_name: string;
  dpi: {
    first_name: string;
    last_name: string;
    birthdate: string;
    gender: string;
  };
  consultation: number;
  parameters: Parameter[];
}

interface Parameter {
  id: number;
  param_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestTodoListService {
  private baseUrl = 'http://127.0.0.1:8000/api';

   constructor(private http: HttpClient) {}
  
    searchBiologicalExams(searchQuery: string = ''): Observable<BiologicalExam[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      });
  
      console.log('Search Query:', searchQuery);
  
      const params = searchQuery
        ? new HttpParams().set('ssn_prefix', searchQuery)
        : new HttpParams();
  
      console.log('Request Parameters:', params.toString());
      const url = `${this.baseUrl}/biological-exams/search/`;
      console.log('Request URL:', url);
  
      return this.http.get<BiologicalExam[]>(url, { headers, params });
    }
    searchTestQR(id: number): Observable<BiologicalExamResponse> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRFTOKEN': 'dETXuon4FPIUMC7HPeK3Jp7A3AA2Ub2gb82escHmKrQumZYXcegSVW1CcozrGWJQ',
      });

      const url = `http://127.0.0.1:8000/api/biological-exams/search/?dpi_id=${id}`;
      return this.http.get<BiologicalExamResponse>(url, { headers });
    }
}
