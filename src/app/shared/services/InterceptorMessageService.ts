import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorMessageService {
  constructor() {}

  public isError = new BehaviorSubject<any>(null);
}
