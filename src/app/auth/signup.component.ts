import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications/dist';
import {ApiService} from '../shared/api.service';
import {environment} from '../../environments/environment';
import {RequestMethod} from '@angular/http';


@Component({
  templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
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

  signup(): void {
    this._api.request(`${this._authUrl}/signup`, RequestMethod.Post, this.user)
      .subscribe(
        res => this._router.navigate(['/polls']),
        err => this._notificationsService.error('Error', 'Signup fail')
      );
  }

}
