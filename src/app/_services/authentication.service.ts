// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

// State management
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@/_models';

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(user: User) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/register`, user)
      .pipe(map((user: LoginResponse) => {
        localStorage.setItem('token', user.token);
        return user.user;
      }));
  }

  public login(email: string, password: string): Observable<User> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(map((user: LoginResponse) => {
        localStorage.setItem('token', user.token);
        return user.user;
    }));
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
