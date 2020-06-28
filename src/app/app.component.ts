import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@/_services';
import { User } from '@/_models';

import '@/_content/app.scss';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public title = 'samyounger-admin';
  public currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
