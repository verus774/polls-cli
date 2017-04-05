import {Component, OnInit} from '@angular/core';
import {RoomService} from './room.service';
import {IRoom} from './room';

@Component({
  templateUrl: 'room-list.component.html'
})
export class RoomListComponent implements OnInit {
  rooms: IRoom[];

  constructor(private _roomService: RoomService) {
    this.rooms = [];
  }

  ngOnInit(): void {
    this._roomService.getAll()
      .subscribe(
        rooms => this.rooms = rooms,
        error => console.log(error)
      );
  }

}
