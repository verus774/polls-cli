import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications/dist';
import {ApiService} from '../shared/api.service';
import {IUser} from './user';

@Component({
  templateUrl: 'user-list.component.html',
  providers: [Modal]
})

export class UserListComponent implements OnInit {
  users: IUser[];

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
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
      .title('Delete user?')
      .body('Are you sure you want to delete this user and the related objects?')
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`users/${id}`).subscribe(
              () => {
                this._notificationsService.success('Users', 'User deleted');
                this.getUsers();
              },
              () => this._notificationsService.error('Error', 'Fail')
            );
          });
      });
  }

}