import {Component, OnInit} from '@angular/core';
import {RoomService} from './room.service';
import {IRoom} from './room';
import {SocketService} from '../shared/socket.service';
import {IPoll} from '../polls/poll';
import {PollService} from '../polls/poll.service';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'room.component.html'
})

export class RoomComponent implements OnInit {
  currentRoom: IRoom;
  activePoll: IPoll;

  constructor(private _location: Location,
              private _roomService: RoomService,
              private _socket: SocketService,
              private _pollService: PollService) {
  }

  ngOnInit(): void {
    this.currentRoom = this._roomService.getCurrentRoom();

    this._pollService.getActive(this.currentRoom._id)
      .subscribe(
        activePoll => this.activePoll = activePoll,
        error => console.log(error)
      );

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
