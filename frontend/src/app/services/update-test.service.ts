import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError  } from 'rxjs';

interface BiologicalExamUpdate {
  result: string;
  exam_date: string;
  lab_technician: number;
  parameters: Array<{
    id: number;
    value: number;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateTestService {
  private baseUrl = 'http://127.0.0.1:8000/api/biological-exams';
  constructor(private http: HttpClient) {}

  updateTest(id: number, data: BiologicalExamUpdate): Observable<any> {
    const url = `${this.baseUrl}/update/${id}/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.patch(url, data, { headers }).
    pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
