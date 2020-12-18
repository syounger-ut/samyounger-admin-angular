// Core
import { Component, OnInit } from '@angular/core';
import { UserService } from '@root/_services';
import { User } from '@root/_models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
