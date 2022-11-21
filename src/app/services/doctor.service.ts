import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Doctor, DoctorPost } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  baseUrl: string = 'http://localhost:8080/api/doctors'

  constructor(private httpClient: HttpClient) {}

  getMembers(key: string | null,specialty : number | null, page :number, size : number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}?key=${key}&page=${page}&size=${size}&specialty=${specialty}`);
  }

  getMemberDetail(id: number) : Observable<Doctor>{
    return this.httpClient.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  addDoctor(doctor: DoctorPost,file: File) {
    const doctor_json=JSON.stringify(doctor);

    const blob= new Blob([doctor_json],{
        type: 'application/json'
    })

    let formData=new FormData();
    formData.append('doctorPostDTO',blob);
    if(file){
      formData.append('image',file);
    }
    
    return this.httpClient.post<any>(`${this.baseUrl}`,formData)
  }

  updateDoctor(doctor: DoctorPost, file:File, id: number) {
    const doctor_json=JSON.stringify(doctor);

    const blob= new Blob([doctor_json],{
        type: 'application/json'
    })

    let formData=new FormData();
    formData.append('doctorPostDTO',blob);
    if(file){
      formData.append('image',file);
    }
    
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`,formData)
  }

  deleteDoctor (id: number){
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }

  getListAppointment(page :number| null = null, size : number | null = null,id: number){
    let params = new HttpParams();
      if(page !== null && size !== null){
        params = new HttpParams().set('size',size).set('page',page);
      }

    return this.httpClient.get<any>(`${this.baseUrl}/${id}/appointments`, {
      params: params,
    });
  }
}
