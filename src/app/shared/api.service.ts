import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AuthService} from './auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Injectable()
export class ApiService {
  private _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient, private _authService: AuthService) {
  }

  get (url: string) {
    return this.request(`${this._apiUrl}/${url}`, 'GET');
  }

  post(url: string, body: Object) {
    return this.request(`${this._apiUrl}/${url}`, 'POST', body);
  }

  put(url: string, body: Object) {
    return this.request(`${this._apiUrl}/${url}`, 'PUT', body);
  }

  delete(url: string) {
    return this.request(`${this._apiUrl}/${url}`, 'DELETE');
  }

  request(url: string, method: string, body?: Object) {
    const requestOptions = {body: {}};

    if (body) {
      requestOptions.body = body;
    }

    return this._http.request(method, url, requestOptions)
      .map((res: any) => res)
      .catch((err: HttpErrorResponse) => this.onRequestError(err));
  }

  onRequestError(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

}
