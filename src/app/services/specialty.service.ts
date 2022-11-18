import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  
  baseUrl: string = 'http://localhost:8080/api/specialties'

  constructor(private httpClient: HttpClient) {}

  getSpecialties(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }

}
