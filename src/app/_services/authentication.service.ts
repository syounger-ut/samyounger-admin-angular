// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

// State management
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@root/_models';
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

  public register$(user: User): Observable<void> {
    return this.http
      .post<AuthenticationResponse>(`${environment.apiUrl}/register`, user)
      .pipe(map((res: AuthenticationResponse) => {
        localStorage.setItem('token', res.token);
        this.userService.setUser(res.user);
      }));
  }

  public getUser$(): Observable<void> {
    return this.http
      .get(`${environment.apiUrl}/users/me`)
      .pipe(map(
        (res: User) => this.userService.setUser(res)
      ));
  }

  public login$(email: string, password: string): Observable<void> {
    return this.http
      .post<AuthenticationResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        map(res => {
          localStorage.setItem('token', res.token);
          this.userService.setUser(res.user);
        }
      ));
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.userService.setUser(null);
    this.router.navigate(['/login']);
  }
}
