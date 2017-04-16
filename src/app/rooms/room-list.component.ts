import {Component, OnInit} from '@angular/core';
import {RoomService} from './room.service';
import {IRoom} from './room';
import {Router} from '@angular/router';
import {SocketService} from '../shared/socket.service';

@Component({
  templateUrl: 'room-list.component.html'
})
export class RoomListComponent implements OnInit {
  rooms: IRoom[];

  constructor(private _roomService: RoomService, private _router: Router, private _socket: SocketService) {
    this.rooms = [];
  }

  ngOnInit(): void {
    this._roomService.getAll()
      .subscribe(
        rooms => this.rooms = rooms,
        error => console.log(error)
      );
  }

  joinRoom(room: IRoom): void {
    this._socket.emit('joinRoom', room._id);
    this._roomService.setCurrentRoom(room);
    this._router.navigate(['/rooms', room._id]);
  }

}
