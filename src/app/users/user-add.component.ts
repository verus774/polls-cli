import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from './user';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../shared/api.service';

@Component({
  templateUrl: 'user-add.component.html'
})

export class UserAddComponent implements OnInit {
  id: string;
  user: IUser = {
    name: '',
    username: '',
    password: ''
  };

  constructor(private _api: ApiService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._api.get(`users/${this.id}`).subscribe(user => this.user = user);
    }
  }

  onSubmit(): void {
    if (this.id) {
      this._api.put(`users/${this.id}`, this.user).subscribe(
        () => {
          this._router.navigate(['/users']);
          this._notificationsService.success('Users', 'User updated');
        },
        () => this._notificationsService.error('Error', 'Fail')
      );
    } else {
      this._api.post('users', this.user).subscribe(
        () => {
          this._router.navigate(['/users']);
          this._notificationsService.success('Users', 'User added');
        },
        () => this._notificationsService.error('Error', 'Fail')
      );
    }
  }

}
