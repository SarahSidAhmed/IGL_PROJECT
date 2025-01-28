import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddMedicamentService {

  private baseUrl = 'http://127.0.0.1:8000/api'; // Replace with your API base URL
    constructor(private http: HttpClient) {}
    
    
      
    
    addMedicament(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/medicine/add`, data);
    }
}
