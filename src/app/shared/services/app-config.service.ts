import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConfiguration } from '../models/app-configuration.model';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  configuration: AppConfiguration = new AppConfiguration();

  constructor(private readonly http: HttpClient) {}

  async initializeApp(): Promise<AppConfiguration> {
    let observable = this.http.get<AppConfiguration>(
      environment.configurationPath
    );

    observable.pipe(take(1)).subscribe((response) => {
      this.configuration = response;
    });

    return await firstValueFrom(observable);
  }
}
