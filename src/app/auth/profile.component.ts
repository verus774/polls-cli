import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {AuthService} from '../shared/auth.service';
import {NotificationsService} from 'angular2-notifications';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private _api: ApiService,
              private _authService: AuthService,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.user = this._authService.getUser();
  }

  onSubmit(): void {
    this._api.put('me', this.user).subscribe(
      () => {
        this._notificationsService.success(
          this._translate.instant('PROFILE.PAGE_HEADER'),
          this._translate.instant('PROFILE.NOTIFICATION_UPDATED')
        );
      },
      () => this._notificationsService.error(
        this._translate.instant('NOTIFICATION_ERR.TITLE'),
        this._translate.instant('NOTIFICATION_ERR.CONTENT')
      )
    );
  }

}
