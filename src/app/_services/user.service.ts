import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getMe() {
    return this.http.get<User[]>(`${config.apiUrl}/users/me`);
  }

  register(user: User) {
    return this.http.post(`${config.apiUrl}/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${config.apiUrl}/users/${id}`);
  }
}
