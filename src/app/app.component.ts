import { Component } from '@angular/core';

import '@root/_content/app.scss';

// Models
import { User } from '@root/_models';

// Services
import { AuthenticationService, UserService } from '@root/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'samyounger-admin';
  public currentUser$: Observable<User>;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.getUser$().subscribe();
    }

    this.currentUser$ = this.userService.user$;
  }
}
