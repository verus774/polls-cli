import {Injectable} from '@angular/core';
import {IRoom} from './room';

@Injectable()
export class RoomService {
  setCurrentRoom(room: IRoom): void {
    localStorage.setItem('currentRoom', JSON.stringify(room));
  }

  getCurrentRoom(): IRoom {
    return JSON.parse(localStorage.getItem('currentRoom'));
  }

  getCurrentRoomUrl(): string {
    return `${window.location.origin}/rooms/${this.getCurrentRoom()._id}`;
  }
}
