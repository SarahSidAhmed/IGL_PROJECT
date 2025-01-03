import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StaffResponse {
  refresh: string;
  access: string;
  staff: {
    id: number;
    role: string;
    email: string;
    name: string;
    phone: string;
    speciality: string;
    created_at: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }): Observable<StaffResponse> {
    return this.http.post<StaffResponse>(this.apiUrl, payload);
  }
}
