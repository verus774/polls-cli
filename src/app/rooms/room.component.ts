import {Component, OnInit} from '@angular/core';
import {RoomService} from './room.service';
import {IRoom} from './room';
import {SocketService} from '../shared/socket.service';
import {IPoll} from '../polls/poll';
import {Location} from '@angular/common';
import {ApiService} from '../shared/api.service';


@Component({
  templateUrl: 'room.component.html'
})

export class RoomComponent implements OnInit {
  currentRoom: IRoom;
  activePoll: IPoll;

  constructor(private _location: Location,
              private _roomService: RoomService,
              private _socket: SocketService,
              private _api: ApiService) {
  }

  ngOnInit(): void {
    this.currentRoom = this._roomService.getCurrentRoom();

    this._api.get(`active-poll?room=${this.currentRoom._id}`)
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
    const answers = {answers: []};

    for (const question of this.activePoll.questions) {
      answers.answers.push({id: question._id, answer: question.answer});
    }

    this._socket.emit('answers', answers);

  }

  trackByFn(index, item) {
    return index;
  }

}
