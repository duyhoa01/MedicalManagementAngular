import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'http://localhost:8080/api/users'

  constructor(private httpClient: HttpClient) { }

  getListUserChat(id: number){
    return this.httpClient.get<any>(`${this.baseUrl}/${id}/contact`);
  }

  getNameById(id:number){
    return this.httpClient.get<any>(`${this.baseUrl}/${id}/name`);
  }
}
