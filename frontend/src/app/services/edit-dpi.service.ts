import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
interface Doctor {
  id: number;
  name: string;
  password: string;
  email: string;
  role: string;
  phone: string;
  created_at: string;
  speciality: string;
}
@Injectable({
  providedIn: 'root',
})
export class EditDpiService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://127.0.0.1:8000/api';
  private apiUrl = 'http://127.0.0.1:8000/api/dpis';
  getDpiById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/`);
  }

  updateDpi(id: number, dpiData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/`, dpiData);
  }
  getDoctors(): Observable<Doctor[]> {
    return this.http
      .get<Doctor[]>(`${this.baseUrl}/doctors/`)
      .pipe(catchError(this.handleError));
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
