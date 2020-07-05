import { Component } from '@angular/core';

import '@root/_content/app.scss';

// Services
import { AuthenticationService } from './_services';

// Models
import { User } from './_models';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public title = 'samyounger-admin';
  public currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    if(localStorage.getItem('token')) {
      this.authenticationService.getUser()
        .subscribe((user: User) => this.currentUser = user);
    }
  }
}
