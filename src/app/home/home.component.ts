import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit() { }

  deleteUser(id: number) {
    this.userService.delete(id)
    .pipe(first())
    .subscribe(() => console.log("DELETING USER"));
  }
}
