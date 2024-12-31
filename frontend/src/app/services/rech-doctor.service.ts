import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface DpiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Dpi[];
}

interface Dpi {
  id: number;
  password: string;
  doctorStaff: {
    id: number;
    name: string;
  };
  social_security_number: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  email: string;
  address: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  gender: string;
  blood_type: string;
  mutuelle_name: string;
  mutuelle_policy_number: string;
  medical_history: string | null;
  hospital: string;
  admission_date: string;
}
@Injectable({
  providedIn: 'root',
})
export class RechDoctorService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  searchDpis(
    doctorId: number,
    ssnPrefix: string = ''
  ): Observable<DpiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    let params = new HttpParams();
    if (ssnPrefix) {
      params = params.set('ssn_prefix', ssnPrefix);
    }

    const url = `${this.baseUrl}/dpis/search/`;

    return this.http.get<DpiResponse>(url, { headers, params }).pipe(
      map((response) => ({
        ...response,
        results: response.results.filter((dpi) =>
          doctorId ? dpi.doctorStaff.id === doctorId : true
        ),
      }))
    );
  }
}
