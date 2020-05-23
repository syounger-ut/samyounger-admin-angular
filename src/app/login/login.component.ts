import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../services/user.service';
import { LoginForm, User } from '../services/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  public user: User;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit() {
  }
  
  onSubmit(loginDetails:LoginForm): void {
    this.user = this.userService.login(loginDetails);
  }
}