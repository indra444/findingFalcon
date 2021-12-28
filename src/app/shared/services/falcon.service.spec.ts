import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppConfiguration } from '../models/app-configuration.model';
import { FindRequest } from '../models/find.request.model';
import { AppConfigService } from './app-config.service';

import { FalconService } from './falcon.service';

export const MockConfiguration: AppConfiguration = {
  isProduction: false,
  apiBaseUrl: { falcon: 'abc/' },
};

describe('FalconService', () => {
  let service: FalconService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FalconService,
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy(),
            post: jasmine.createSpy(),
          },
        },
        {
          provide: AppConfigService,
          useValue: {
            configuration: MockConfiguration,
          },
        },
      ],
    });
    service = TestBed.inject(FalconService);
    httpClient = TestBed.inject<jasmine.SpyObj<HttpClient>>(HttpClient as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPlanets', () => {
    // Arrange
    const expectedUrl = 'abc/planets';

    // Act
    service.getPlanets();

    // Assert
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get.calls.mostRecent().args[0]).toEqual(expectedUrl);
  });

  it('getVehicles', () => {
    // Arrange
    const expectedUrl = 'abc/vehicles';

    // Act
    service.getVehicles();

    // Assert
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get.calls.mostRecent().args[0]).toEqual(expectedUrl);
  });

  it('getToken', () => {
    // Arrange
    const expectedUrl = 'abc/token';

    // Act
    service.getToken();

    // Assert
    expect(httpClient.post).toHaveBeenCalled();
    expect(httpClient.post.calls.mostRecent().args[0]).toEqual(expectedUrl);
  });

  it('findFalcon', () => {
    // Arrange
    const expectedUrl = 'abc/find';
    const request: FindRequest = {
      token: '',
      planet_names: [],
      vehicle_names: [],
    };

    // Act
    service.findFalcon(request);

    // Assert
    expect(httpClient.post).toHaveBeenCalled();
    expect(httpClient.post.calls.mostRecent().args[0]).toEqual(expectedUrl);
  });
});
