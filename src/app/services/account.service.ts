import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthUser, Patient, UserToken } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = 'http://localhost:8080/api'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  httpOptions2 = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    })
  }

  private currentUser = new BehaviorSubject<UserToken | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(authUser: AuthUser): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/login`, authUser, this.httpOptions)
      .pipe(
        map((response: UserToken) => {
          if (response) {
            this.currentUser.next(response)
            localStorage.setItem('userToken', JSON.stringify(response));
          }
        })
      )
  }
  logout() {
    this.currentUser.next(null)
    localStorage.removeItem('userToken')
  }
  reLogin() {
    const storageUser = localStorage.getItem("userToken");
    if (storageUser) {
      const userToken = JSON.parse(storageUser);
      this.currentUser.next(userToken);
    }
  }
  register(patient: Patient, file: File) {
    const doctor_json = JSON.stringify(patient);

    const blob = new Blob([doctor_json], {
      type: 'application/json'
    })

    let formData = new FormData();
    formData.append('patientPostDTO', blob);
    if (file) {
      formData.append('image', file);
    }

    return this.httpClient.post<any>(`${this.baseUrl}/register`, formData)
  }
}
