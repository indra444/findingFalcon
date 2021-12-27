import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpClientService {
  constructor(private readonly httpClient: HttpClient) {}

  get<T>(url: string, request?: any): Observable<T> {
    return this.httpClient.get<T>(url);
  }
  post<T>(url: string, body?: any): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }
}
