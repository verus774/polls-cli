import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {IPoll} from './poll';
import {NotificationsService} from 'angular2-notifications';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {AuthService} from '../shared/auth/auth.service';
import {SocketService} from '../shared/socket.service';
import {ApiService} from '../shared/api.service';
import {ICategory} from '../categories/category';

@Component({
  templateUrl: 'poll-list.component.html',
  providers: [Modal]
})

export class PollListComponent implements OnInit {
  polls: IPoll[];
  categories: ICategory[];
  activePoll: IPoll;
  answers: any[] = [];

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _notificationsService: NotificationsService,
              private _authService: AuthService,
              private _socket: SocketService) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPolls();

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

    this._socket.on('answers').subscribe((data) => {
      for (const answer of data.answers) {
        this.answers.push(answer);
      }
    });

    this._socket.on('error').subscribe(() => {
      this._notificationsService.error('Error', 'Fail');
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

  getCategories(): void {
    this._api.get('categories').subscribe(categories => this.categories = categories);
  }

  removePoll(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title('Delete poll?')
      .body('Are you sure you want to delete this poll and the related results?')
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`polls/${id}`).subscribe(
              () => {
                this._notificationsService.success('Polls', 'Poll deleted');
                this.getPolls();
              },
              () => this._notificationsService.error('Error', 'Fail')
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

}
