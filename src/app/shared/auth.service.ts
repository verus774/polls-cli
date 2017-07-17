import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {IUser} from '../users/user';

@Injectable()
export class AuthService {
  private _authUrl = environment.authUrl;
  private _storageKey = 'access_token';

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _http: Http, private _router: Router) {
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post(`${this._authUrl}/login`, {username: username, password: password})
      .map((res: Response) => {
        const token = res.json().data.token;
        if (token) {
          this.setToken(token);
        }
      })
      .catch(this.handleError);
  }

  signup(username: string, name: string, password: string): Observable<any> {
    return this._http.post(`${this._authUrl}/signup`, {username: username, name: name, password: password})
      .map((res: Response) => {
        const token = res.json().data.token;

        if (token) {
          this.setToken(token);
        }
      })
      .catch(this.handleError);
  }

  setToken(token: string): void {
    localStorage.setItem(this._storageKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this._storageKey);
  }

  logout(): void {
    localStorage.removeItem(this._storageKey);
    this._router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return tokenNotExpired(null, this.getToken());
  }

  getUser(): IUser {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.getUser().role === 'admin';
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
