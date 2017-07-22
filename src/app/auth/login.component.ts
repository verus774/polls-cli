import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../shared/api.service';
import {RequestMethod} from '@angular/http';
import {environment} from '../../environments/environment';
import {NotificationsService} from 'angular2-notifications/dist';


@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  user: any = {};
  private _authUrl = environment.authUrl;

  constructor(private _api: ApiService,
              private _authService: AuthService,
              private _router: Router,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/polls']);
    }
  }

  login(): void {
    this._api.request(`${this._authUrl}/login`, RequestMethod.Post, this.user)
      .subscribe(
        res => this._router.navigate(['/polls']),
        err => this._notificationsService.error('Error', 'Login fail')
      );

  }
}
