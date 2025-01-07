import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServie: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.authServie.getToken();

    if (token) {
      const cloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloneRequest);
    }
    return next.handle(request);
  }
}
