// Core
import { Injectable } from '@angular/core';

// Models
import { User } from '@root/_models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  public user: User = new User({});
  public userChanged$ = new BehaviorSubject<User>(this.user);

  public setUser(user: User): void {
    this.userChanged$.next(user);
  }
}
