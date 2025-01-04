import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError  } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RadioUpdateService {
  private baseUrl = 'http://127.0.0.1:8000/api/radiological-exams';

  constructor(private http: HttpClient) {}

  updateRadiologicalExam(id: string, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/${id}/update/`;
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    return this.http.patch(url, formData, { headers }).
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