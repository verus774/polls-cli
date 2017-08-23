import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {IPoll} from './poll';
import {NotificationsService} from 'angular2-notifications';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {AuthService} from '../shared/auth.service';
import {SocketService} from '../shared/socket.service';
import {ApiService} from '../shared/api.service';
import {ICategory} from '../categories/category';
import {TranslateService} from '@ngx-translate/core';
import {RoomService} from '../rooms/room.service';

@Component({
  templateUrl: 'poll-list.component.html',
  providers: [Modal]
})

export class PollListComponent implements OnInit {
  polls: IPoll[];
  categories: ICategory[];
  currCategoryId: string;
  activePoll: IPoll;

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _notificationsService: NotificationsService,
              private _authService: AuthService,
              private _roomService: RoomService,
              private _translate: TranslateService,
              private _socket: SocketService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPolls();
    this.getActivePoll();

    this._socket.on('startPoll').subscribe((data) => {
      this.activePoll = data;

      for (const poll of this.polls) {
        if (data._id === poll._id) {
          poll.active = true;
        }
      }
    });

    this._socket.on('stopPoll').subscribe((data) => {
      this.activePoll = null;

      for (const poll of this.polls) {
        if (data._id === poll._id) {
          poll.active = false;
        }
      }
    });

    this._socket.on('error').subscribe(() => {
      this._notificationsService.error(
        this._translate.instant('NOTIFICATION_ERR.TITLE'),
        this._translate.instant('NOTIFICATION_ERR.CONTENT')
      );
    });

  }

  getPolls(): void {
    this._api.get('polls').subscribe(polls => {
      this.polls = polls;

      for (const poll of polls) {
        if (poll.active === true) {
          this.activePoll = poll;
        }
      }
      this._socket.emit('joinRoom', this._authService.getUser()._id);
    });

  }

  getActivePoll(): void {
    this._api.get(`active-poll?room=${this._roomService.getCurrentRoom()._id}`).subscribe(activePoll => {
      this.activePoll = activePoll;
    });
  }

  getCategories(): void {
    this._api.get('categories').subscribe(categories => this.categories = categories);
  }

  removePoll(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title(this._translate.instant('POLL_LIST.MODAL_DELETE_TITLE'))
      .body(this._translate.instant('POLL_LIST.MODAL_DELETE_BODY'))
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`polls/${id}`).subscribe(
              () => {
                this._notificationsService.success(
                  this._translate.instant('POLL_LIST.NOTIFICATION_TITLE'),
                  this._translate.instant('POLL_LIST.NOTIFICATION_DELETED')
                );
                this.getPolls();
              },
              () => this._notificationsService.error(
                this._translate.instant('NOTIFICATION_ERR.TITLE'),
                this._translate.instant('NOTIFICATION_ERR.CONTENT')
              )
            );
          });
      });
  }

  startPoll(id: string): void {
    this._socket.emit('startPoll', {access_token: this._authService.getToken(), id: id});
  }

  stopPoll(id: string): void {
    this._socket.emit('stopPoll', {access_token: this._authService.getToken(), id: id});
  }

  resetCategoryFilter(): void {
    this.currCategoryId = null;
  }

}
