import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
  providedIn: 'root'
})
export class CreateDpiService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  

  constructor(private http: HttpClient) { }
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors/`).pipe(
      catchError(this.handleError)
    );
  }

  createDpi(data: any): Observable<any> {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
     
    });

   
    const formattedData = {
      ...data
    };

    return this.http.post(`${this.baseUrl}/dpis/`, formattedData, { headers }).pipe(
      catchError(this.handleError)
    );
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