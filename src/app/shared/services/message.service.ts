import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: Subject<string> = new Subject();
  constructor() {}

  sendMessage(product: string): void {
    this.message.next(product);
  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }
}
