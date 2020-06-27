// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

// Models
import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getMe() {
    return this.http.get<User>(`${environment.apiUrl}/users/me`);
  }
}
