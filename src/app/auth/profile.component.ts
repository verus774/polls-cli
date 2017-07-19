import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {AuthService} from '../shared/auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private _api: ApiService,
              private _authService: AuthService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  onSubmit(): void {
    this._api.put('me', this.user).subscribe(
      () => {
        this._notificationsService.success('Profile', 'Profile updated');
      },
      () => this._notificationsService.error('Error', 'Fail')
    );
  }

}
