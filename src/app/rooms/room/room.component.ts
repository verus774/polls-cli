import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {IRoom} from '../room';
import {SocketService} from '../../shared/socket.service';
import {IPoll} from '../../polls/poll';
import {Location} from '@angular/common';
import {ApiService} from '../../shared/api.service';
import {NotificationsService} from 'angular2-notifications';
import {TranslateService} from '@ngx-translate/core';
import {IAnswer} from '../answer';


@Component({
  templateUrl: './room.component.html'
})

export class RoomComponent implements OnInit {
  currentRoom: IRoom;
  activePoll: IPoll;

  constructor(private _location: Location,
              private _roomService: RoomService,
              private _socket: SocketService,
              private _api: ApiService,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.currentRoom = this._roomService.getCurrentRoom();

    this._api.get(`active-poll?room=${this.currentRoom._id}`).map((res: any) => res.data)
      .subscribe(activePoll => this.activePoll = activePoll);

    this._socket.on('startPoll').subscribe((data) => {
      this.activePoll = data;
    });

    this._socket.on('stopPoll').subscribe(() => {
      this.activePoll = null;
    });
  }

  onBack(): void {
    this._socket.emit('leaveRoom', this.currentRoom._id);
    this._location.back();
  }

  onSubmit(): void {
    let answers: IAnswer[] = [];

    for (const question of this.activePoll.questions) {
      answers.push({question: question.text, answer: question.answer});
    }

    this._socket.emit('answers', answers);

    answers = null;
    this.activePoll = null;

    this._location.back();
    this._notificationsService.success(
      this._translate.instant('ROOM.NOTIFICATION_SUBMITTED_TITLE'),
      this._translate.instant('ROOM.NOTIFICATION_SUBMITTED')
    );
  }

}
