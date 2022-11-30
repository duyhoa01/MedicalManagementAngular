import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { messagePost } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl: string = 'http://localhost:8080/api/messages';

  headers = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private httpClient: HttpClient) {}

  getListMessage(sender_id: number, receiver_id : number){
    let params = new HttpParams().set('sender_id',sender_id).set('receiver_id',receiver_id);
    return this.httpClient.get<any>(`${this.baseUrl}`, {
      params: params,
    });
  }

  addMessage(message:messagePost){
    return this.httpClient.post(`${this.baseUrl}`,message,
    {
      responseType: "text",
      headers: this.headers,
    });
  }
}
