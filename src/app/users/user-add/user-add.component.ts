import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../user';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../../shared/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './user-add.component.html'
})

export class UserAddComponent implements OnInit {
  user: IUser = {
    name: '',
    username: '',
    password: ''
  };

  constructor(private _api: ApiService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    const user = this._route.snapshot.data['user'];
    if (user) {
      this.user = user;
    }
  }

  onSubmit(): void {
    if (this.user._id) {
      this._api.put(`users/${this.user._id}`, this.user).subscribe(
        () => {
          this._router.navigate(['/users']);
          this._notificationsService.success(
            this._translate.instant('USER_ADD.NOTIFICATION_TITLE'),
            this._translate.instant('USER_ADD.NOTIFICATION_UPDATED')
          );
        },
        () => this._notificationsService.error(
          this._translate.instant('NOTIFICATION_ERR.TITLE'),
          this._translate.instant('NOTIFICATION_ERR.CONTENT')
        )
      );
    } else {
      this._api.post('users', this.user).subscribe(
        () => {
          this._router.navigate(['/users']);
          this._notificationsService.success(
            this._translate.instant('USER_ADD.NOTIFICATION_TITLE'),
            this._translate.instant('USER_ADD.NOTIFICATION_ADDED')
          );
        },
        () => this._notificationsService.error(
          this._translate.instant('NOTIFICATION_ERR.TITLE'),
          this._translate.instant('NOTIFICATION_ERR.CONTENT')
        )
      );
    }
  }

}
