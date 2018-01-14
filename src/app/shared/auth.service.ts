import {Injectable, Injector} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {IUser} from '../users/user';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private _accessStorageKey = 'access_token';
  private _refreshStorageKey = 'refresh_token';

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private _router: Router, private injector: Injector) {
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this._accessStorageKey, token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this._refreshStorageKey, token);
  }

  getAccessToken(): string {
    return localStorage.getItem(this._accessStorageKey);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshStorageKey);
  }

  logout(): void {
    localStorage.removeItem(this._accessStorageKey);
    localStorage.removeItem(this._refreshStorageKey);
    this._router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUser(): IUser {
    return this.jwtHelper.decodeToken(this.getAccessToken());
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.getUser().role === 'admin';
  }

  refreshToken(): Observable<any> {
    const api = this.injector.get(ApiService);
    const refreshToken = this.getRefreshToken();
    return api.request(`${environment.authUrl}/refresh-token`, 'POST', {refreshToken});
  }

}
