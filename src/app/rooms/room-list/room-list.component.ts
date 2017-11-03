import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {IRoom} from '../room';
import {Router} from '@angular/router';
import {SocketService} from '../../shared/socket.service';
import {ApiService} from '../../shared/api.service';

@Component({
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {
  rooms: IRoom[];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private _roomService: RoomService,
              private _api: ApiService,
              private _router: Router,
              private _socket: SocketService) {
    this.rooms = [];
  }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(page = this.currentPage): void {
    this._api.get(`rooms?page=${page}&limit=${this.itemsPerPage}`)
      .subscribe(res => {
        this.rooms = res.data;
        this.totalItems = res.meta.paging.total;
        this.currentPage = page;
      });
  }

  joinRoom(room: IRoom): void {
    this._socket.emit('joinRoom', room._id);
    this._roomService.setCurrentRoom(room);
    this._router.navigate(['/rooms', room._id]);
  }

}
