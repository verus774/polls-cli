import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthService} from '../auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((errorRes: HttpErrorResponse) => {
        if (errorRes.status === 401 || errorRes.status === 403) {
          return this._authService.refreshToken()
            .flatMap(() => next.handle(req))
            .catch((response) => {
              this._authService.logout();
              return Observable.throw(response);
            });
        }
        return Observable.throw(errorRes);
      });
  }
}
