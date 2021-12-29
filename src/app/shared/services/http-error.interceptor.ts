import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { InterceptorMessageService } from './InterceptorMessageService';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private interceptorMessageService: InterceptorMessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResp) => {
        this.handleApiErrors(errorResp);
        throw errorResp;
      })
    );
  }

  handleApiErrors(errorResponse: any) {
    this.interceptorMessageService.isError.next(errorResponse.message);
  }
}
