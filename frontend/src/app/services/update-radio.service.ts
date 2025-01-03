import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError  } from 'rxjs';

export interface RadiologicalExamUpdate {
  result: string;
  exam_date: string;
  radiologist: number | null;
  image: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class RadioUpdateService {
  private baseUrl = 'http://127.0.0.1:8000/api/radiological-exams';

  constructor(private http: HttpClient) {}

  updateRadiologicalExam(id: string, data: RadiologicalExamUpdate): Observable<any> {
    const url = `${this.baseUrl}/${id}/update/`;
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