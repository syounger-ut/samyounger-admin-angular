import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

// RxJs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { AuthenticationService } from '@root/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if(err.status === 401) {
        this.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

  private logout(): void {
    this.authenticationService.logout();
  }
}
