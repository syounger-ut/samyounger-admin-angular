// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

// State management
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService } from './user.service';

interface AuthenticationResponse {
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
    private userService: UserService,
  ) {}

  register(user: User) {
    return this.http
      .post<AuthenticationResponse>(`${environment.apiUrl}/register`, user)
      .pipe(map((res: AuthenticationResponse) => {
        this.onSuccessfulAuthResponse(res.token, res.user);
        return res.user;
      }));
  }

  public getUser(): Observable<User> {
    return this.http
      .get(`${environment.apiUrl}/users/me`)
      .pipe(map(
        (res: User) => {
          this.userService.setUser(res);
          return res;
        }
      ));
  }

  public login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthenticationResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(map((res: AuthenticationResponse) => {
        this.onSuccessfulAuthResponse(res.token, res.user);
        return res.user;
    }));
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private onSuccessfulAuthResponse(token: string, user: User): void {
    localStorage.setItem('token', token);
    this.userService.setUser(user);
  }
}
