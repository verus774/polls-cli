import {Component, OnInit} from '@angular/core';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../../shared/api.service';
import {IUser} from '../user';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './user-list.component.html',
  providers: [Modal]
})

export class UserListComponent implements OnInit {
  users: IUser[];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private _api: ApiService,
              public modal: Modal,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page = this.currentPage): void {
    this._api.get(`users?page=${page}&limit=${this.itemsPerPage}`)
      .subscribe(res => {
        this.users = res.data;
        this.totalItems = res.meta.paging.total;
        this.currentPage = page;
      });
  }

  removeUser(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title(this._translate.instant('USER_LIST.MODAL_DELETE_TITLE'))
      .body(this._translate.instant('USER_LIST.MODAL_DELETE_BODY'))
      .open()
      .result
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
  }

}
