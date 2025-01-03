import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = '/biological-records';

  constructor(private http: HttpClient) {}

  updateTest(id: number, data: BiologicalExamUpdate): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/update/`, data);
  }
}
