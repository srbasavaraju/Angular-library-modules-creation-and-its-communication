import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  private readonly userName = new Subject<string>();
  userNameChanged$ = this.userName.asObservable();

  onUserNameChanged(name: string) {
    this.userName.next(name);
  }
}
