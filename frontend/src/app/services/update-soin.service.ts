import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface NursingRecordUpdate {
  patient_observation: string | null;
  record_date: string | null;
  nurse: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class SoinUpdateService {
  private baseUrl = 'http://127.0.0.1:8000/api/nursing-records';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor(private http: HttpClient) {}

  updateNursingRecord(id: number, data: NursingRecordUpdate): Observable<any> {
    const url = `${this.baseUrl}/${id}/update`;
    console.log('Data to send:', data);
    console.log('URL:', url);
    console.log('Headers:', this.headers);

    return this.http.put(url, data, { headers: this.headers }).
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
