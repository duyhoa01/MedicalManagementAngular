import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppointmentPost } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl: string = 'http://localhost:8080/api/appointments'
  headers = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private httpClient: HttpClient) { }

  makeAppointment(appointment: AppointmentPost) {
    return this.httpClient.post(`${this.baseUrl}`,appointment,
    {
      responseType: "text",
      headers: this.headers,
    });
  }

  getListAppointment(page :number| null = null, size : number | null = null){
    let params = new HttpParams().set('sort','id,desc');
      if(page !== null && size !== null){
        params = new HttpParams().set('size',size).set('page',page).set('sort','id,desc');
      }

    return this.httpClient.get<any>(`${this.baseUrl}`, {
      params: params,
    });
  }

  appceptAppointment(id : number){
    return this.httpClient.get<any>(`${this.baseUrl}/${id}/enable`)
  }
}
