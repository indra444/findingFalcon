import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { InterceptorMessageService } from './InterceptorMessageService';

describe('HttpErrorInterceptor', () => {
  let messageService: jasmine.SpyObj<InterceptorMessageService>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        {
          provide: InterceptorMessageService,
          useValue: {
            isError: jasmine.createSpy(),
          },
        },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor =
      TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should handle errors', () => {
    const interceptor: HttpErrorInterceptor =
      TestBed.inject(HttpErrorInterceptor);

    messageService = TestBed.inject<jasmine.SpyObj<InterceptorMessageService>>(
      InterceptorMessageService as any
    );

    let httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(
      throwError({ error: { message: 'test-error' } })
    );
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => console.log('good', result),
      (err) => {
        console.log('error', err);
        setTimeout(function () {
          expect(messageService.isError).toHaveBeenCalled();
        }, 1000);
      }
    );
  });
});
