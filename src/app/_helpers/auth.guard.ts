import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}

  canActivate() {
    if (this.tokenExists()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  private tokenExists(): boolean {
    return !!localStorage.getItem('token');
  }
}
