import {Injectable} from '@angular/core';
import {IRoom} from './room';
import {AuthService} from '../shared/auth.service';

@Injectable()
export class RoomService {
  constructor(private _authService: AuthService) {
  }

  getCurrentRoom(): IRoom {
    const user = this._authService.getUser();
    return {
      _id: user._id,
      name: user.name
    };
  }

  getCurrentRoomUrl(): string {
    return `${window.location.origin}/rooms/${this.getCurrentRoom()._id}`;
  }
}
