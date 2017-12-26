import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthService} from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone();

    const token = this._authService.getToken();
    if (token) {
      req = req.clone({
        headers:
          req.headers.set('Authorization', token)
      });
    }

    return next.handle(req).do(res => {
      if (res instanceof HttpResponse) {
        if (res.body.data && res.body.data.token) {
          this._authService.setToken(res.body.data.token);
        }
      }
    });

  }
}
