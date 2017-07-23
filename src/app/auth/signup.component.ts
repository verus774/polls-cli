import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications/dist';
import {ApiService} from '../shared/api.service';
import {environment} from '../../environments/environment';
import {RequestMethod} from '@angular/http';
import {NgForm} from '@angular/forms';


@Component({
  templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
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
    this._api.request(`${this._authUrl}/signup`, RequestMethod.Post, form.value)
      .subscribe(
        res => this._router.navigate(['/polls']),
        err => {
          form.reset();
          this._notificationsService.error('Error', 'Signup fail');
        }
      );
  }

}
