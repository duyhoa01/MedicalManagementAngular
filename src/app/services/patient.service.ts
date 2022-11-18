import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/app-user';
import { PatientResponse } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl: string = 'http://localhost:8080/api/patients'

  constructor(private httpClient: HttpClient) { }

  getListPatient(key?: string, page :number| null = null, size : number | null = null){
    let params = new HttpParams();
    if (key){
      if(page !== null && size !== null){
        params = new HttpParams().set('key',key).set('size',size).set('page',page);
      } else{
        params = new HttpParams().set('key',key);
      }
    } else{
      if(page !== null && size !== null){
        params = new HttpParams().set('size',size).set('page',page);
        console.log(page+' '+size)
      } else{
        console.log(' not ')
      }
    }

    return this.httpClient.get<any>(`${this.baseUrl}`, {
      params: params,
    });
  }

  addPatient(patient: Patient, file: File) {
    const doctor_json = JSON.stringify(patient);

    const blob = new Blob([doctor_json], {
      type: 'application/json'
    })

    let formData = new FormData();
    formData.append('patientPostDTO', blob);
    if (file) {
      formData.append('image', file);
    }

    return this.httpClient.post<any>(`${this.baseUrl}`, formData)
  }

  getDetailPatient(id: number) : Observable<PatientResponse>{
    return this.httpClient.get<PatientResponse>(`${this.baseUrl}/${id}`);
  }

  updatePatient(patient: Patient, file: File, id: number) {
    const patient_json = JSON.stringify(patient);

    const blob = new Blob([patient_json], {
      type: 'application/json'
    })

    let formData = new FormData();
    formData.append('patientPostDTO', blob);
    if (file) {
      formData.append('image', file);
    }

    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, formData)
  }

  deletePatient(id : number ){
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`)
  }

}
