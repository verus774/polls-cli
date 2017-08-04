import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../shared/api.service';
import {environment} from '../../environments/environment';
import {NotificationsService} from 'angular2-notifications';
import {NgForm} from '@angular/forms';


@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
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

  onSubmit(form: NgForm): void {
    this._api.request(`${this._authUrl}/login`, 'POST', form.value)
      .subscribe(
        res => this._router.navigate(['/polls']),
        err => {
          form.reset();
          this._notificationsService.error('Error', 'Login fail');
        }
      );
  }
}
