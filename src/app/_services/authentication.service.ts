import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
  ) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, { email, password })
      .pipe(map(user => {
        localStorage.setItem('token', user.token);
        return user;
    }));
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
