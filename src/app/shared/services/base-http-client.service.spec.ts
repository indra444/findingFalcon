import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BaseHttpClientService } from './base-http-client.service';

describe('BaseHttpClientService', () => {
  let service: BaseHttpClientService;

  let httpClient: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseHttpClientService,
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy(),
            post: jasmine.createSpy(),
          },
        },
      ],
    });
    service = TestBed.inject(BaseHttpClientService);
    httpClient = TestBed.inject<jasmine.SpyObj<HttpClient>>(HttpClient as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get', () => {
    // Arrange
    const expectedUrl = '/endpoint';

    // Act
    service.get('/endpoint');

    // Assert
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get.calls.mostRecent().args[0]).toEqual(expectedUrl);
  });

  it('post', () => {
    // Arrange
    const expectedUrl = '/endpoint';

    // Act
    service.post('/endpoint');

    // Assert
    expect(httpClient.post).toHaveBeenCalled();
    expect(httpClient.post.calls.mostRecent().args[0]).toEqual(expectedUrl);
  });
});
