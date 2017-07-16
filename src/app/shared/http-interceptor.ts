import {Injectable} from '@angular/core';
import {Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class MyHttpInterceptor extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    const token = localStorage.getItem('access_token');
    options.headers.set('Authorization', token);
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem('access_token');
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', token);
    } else {
      url.headers.set('Authorization', token);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: MyHttpInterceptor) {
    return (res: Response) => {
      return Observable.throw(res);
    };
  }

}

export const HttpInterceptor = {provide: Http, useClass: MyHttpInterceptor};
