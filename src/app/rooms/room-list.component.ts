import {Component, OnInit} from '@angular/core';
import {RoomService} from './room.service';
import {IRoom} from './room';
import {Router} from '@angular/router';
import {SocketService} from '../shared/socket.service';
import {ApiService} from '../shared/api.service';

@Component({
  templateUrl: 'room-list.component.html'
})
export class RoomListComponent implements OnInit {
  rooms: IRoom[];

  constructor(private _roomService: RoomService,
              private _api: ApiService,
              private _router: Router,
              private _socket: SocketService) {
    this.rooms = [];
  }

  ngOnInit(): void {
    this._api.get('rooms').subscribe(rooms => this.rooms = rooms);
  }

  joinRoom(room: IRoom): void {
    this._socket.emit('joinRoom', room._id);
    this._roomService.setCurrentRoom(room);
    this._router.navigate(['/rooms', room._id]);
  }

}
