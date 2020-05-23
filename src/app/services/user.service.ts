import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User, Login } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) {}


  login(loginDetails): void {
    localStorage.removeItem('TOKEN');

    this.http.post<Login>(
      'http://localhost:3000/api/login',
      loginDetails,
    ).subscribe(res => {
      localStorage.setItem('TOKEN', res.token);
    });
  }
}