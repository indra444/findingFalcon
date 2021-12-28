import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpClientService {
  httpOptions = {
    headers: new HttpHeaders().set('Accept', 'application/json'),
  };

  constructor(private readonly httpClient: HttpClient) {}

  get<T>(url: string, request?: any): Observable<T> {
    return this.httpClient.get<T>(url, this.httpOptions);
  }
  post<T>(url: string, body?: any): Observable<T> {
    return this.httpClient.post<T>(url, body, this.httpOptions);
  }
}
