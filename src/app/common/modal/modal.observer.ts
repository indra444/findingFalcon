import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalObserver {
  constructor() {}

  public open = new BehaviorSubject<boolean>(false);
}
