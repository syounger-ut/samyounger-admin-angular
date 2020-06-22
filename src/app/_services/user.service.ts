import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getMe() {
    return this.http.get<User>(`${environment.apiUrl}/users/me`);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
