import { Component, Input } from '@angular/core';

// Services
import { AuthenticationService, UserService } from '@root/_services';

// Models
import { User } from '@root/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() public user: User;

  public constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {}

  public ngOnInit(): void {
    this.loggedIn$().subscribe(console.log);
  }

  public logout() {
    this.authenticationService.logout();
  }

  public loggedIn$(): Observable<User> {
    return this.userService.user$;
  }
}
