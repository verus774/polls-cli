import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../shared/api.service';
import {IUser} from './user';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: 'user-list.component.html',
  providers: [Modal]
})

export class UserListComponent implements OnInit {
  users: IUser[];

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this._api.get('users').subscribe(users => this.users = users);
  }

  removeUser(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title(this._translate.instant('USER_LIST.MODAL_DELETE_TITLE'))
      .body(this._translate.instant('USER_LIST.MODAL_DELETE_BODY'))
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`users/${id}`).subscribe(
              () => {
                this._notificationsService.success(
                  this._translate.instant('USER_LIST.NOTIFICATION_TITLE'),
                  this._translate.instant('USER_LIST.NOTIFICATION_DELETED')
                );
                this.getUsers();
              },
              () => this._notificationsService.error(
                this._translate.instant('NOTIFICATION_ERR.TITLE'),
                this._translate.instant('NOTIFICATION_ERR.CONTENT')
              )
            );
          });
      });
  }

}
