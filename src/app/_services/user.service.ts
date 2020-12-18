// Core
import { Injectable } from '@angular/core';

// Models
import { User } from '@root/_models';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user$ = new ReplaySubject<User>();

  public setUser(user: User): void {
    this.user$.next(user);
  }
}
