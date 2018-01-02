import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {IRoom} from '../room';
import {SocketService} from '../../shared/socket.service';
import {IPoll} from '../../polls/poll';
import {Location} from '@angular/common';
import {ApiService} from '../../shared/api.service';
import {NotificationsService} from 'angular2-notifications';
import {TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import {IAnswer} from '../answer';
import {ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: './room-detail.component.html'
})

export class RoomDetailComponent implements OnInit {
  currentRoom: IRoom;
  activePoll: IPoll;

  constructor(private _location: Location,
              private _roomService: RoomService,
              private _socket: SocketService,
              private _api: ApiService,
              private _translate: TranslateService,
              private _route: ActivatedRoute,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    const roomId = this._route.snapshot.paramMap.get('id');
    this.currentRoom = {_id: roomId, name: ''};
    this._socket.emit('joinRoom', roomId);

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

    this._notificationsService.success(
      this._translate.instant('ROOM.NOTIFICATION_SUBMITTED_TITLE'),
      this._translate.instant('ROOM.NOTIFICATION_SUBMITTED')
    );

    this.onBack();
  }

}
