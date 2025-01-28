import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface NursingRecordResponse {
  pages: number;
  results: NursingRecord[];
}

interface NursingRecord {
  id: number;
  care_name: string;
  dpi: {
    first_name: string;
    last_name: string;
    birthdate: string;
    gender: string;
  };
  consultation: number;
}



@Injectable({
  providedIn: 'root'
})
export class SoinListService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  searchNursingRecords(searchQuery: string = ''): Observable<NursingRecord[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    console.log('Search Query:', searchQuery);

    const params = searchQuery
      ? new HttpParams().set('ssn_prefix', searchQuery)
      : new HttpParams();

    console.log('Request Parameters:', params.toString());
    const url = `${this.baseUrl}/nursing-records/search/`;
   

    return this.http.get<NursingRecord[]>(url, { headers, params });
  }
  searchSoinQR(id: number): Observable<NursingRecordResponse> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-CSRFTOKEN': 'dETXuon4FPIUMC7HPeK3Jp7A3AA2Ub2gb82escHmKrQumZYXcegSVW1CcozrGWJQ',
  });

  const url = `http://127.0.0.1:8000/api/nursing-records/search/?dpi_id=${id}`;

  return this.http.get<NursingRecordResponse>(url, { headers });
}
}