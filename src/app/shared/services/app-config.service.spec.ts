import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppConfigService,
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy().and.returnValue(of(1)),
          },
        },
      ],
    });
    service = TestBed.inject(AppConfigService);
    httpClient = TestBed.inject<jasmine.SpyObj<HttpClient>>(HttpClient as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initializeApp', () => {
    // Arrange
    const expectedUrl = '/endpoint';

    // Act
    service.initializeApp();

    // Assert
    expect(httpClient.get).toHaveBeenCalled();
  });
});
