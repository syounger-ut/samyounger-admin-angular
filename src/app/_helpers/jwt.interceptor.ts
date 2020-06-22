import { Injectable } from '@angular/core';
import { HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (!!this.getToken()) {
      const tokenizedRequest = request.clone({
        setHeaders : {
          Authorization : "Bearer " + this.getToken()
        }
      })

      return next.handle(tokenizedRequest);
    } else {
      return next.handle(request);
    }
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }
}
