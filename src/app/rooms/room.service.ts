import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IRoom} from './room';

@Injectable()
export class RoomService {
  private _roomUrl = 'http://polls2.herokuapp.com/api/v1/rooms';

  constructor(private _http: Http) {
  }

  getAll(): Observable<IRoom[]> {
    return this._http.get(this._roomUrl)
      .map((response: Response) => <IRoom[]> response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

}
