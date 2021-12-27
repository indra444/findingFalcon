import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindRequest } from './models/find.request.model';
import { FindResponse } from './models/find.response.model';
import { Planet } from './models/planet.model';
import { Vehicle } from './models/vehicle.model';
import { AppConfigService } from './services/app-config.service';
import { BaseHttpClientService } from './services/base-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class FalconService extends BaseHttpClientService {
  constructor(
    private appConfigService: AppConfigService,
    httpClient: HttpClient
  ) {
    super(httpClient);
  }

  getPlanets(): Observable<Planet[]> {
    let url = this.getServiceUrl('planets');
    return this.get<Planet[]>(url);
  }

  getVehicles(): Observable<Vehicle[]> {
    let url = this.getServiceUrl('vehicles');
    return this.get<Vehicle[]>(url);
  }

  getToken(): Observable<string> {
    let url = this.getServiceUrl('token');
    return this.post<string>(url);
  }

  findFalcon(requestBody: FindRequest): Observable<FindResponse> {
    let url = this.getServiceUrl('find');
    return this.post<FindResponse>(url, requestBody);
  }

  private getServiceUrl(url: string): string {
    return `${this.appConfigService.configuration.apiBaseUrl.falcon}${url}`;
  }
}
