import { Component } from '@angular/core';

import '@root/_content/app.scss';

// Models
import { User } from '@root/_models';

// Services
import { AuthenticationService } from '@root/_services';

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
