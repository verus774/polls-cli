import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {IPoll} from './poll';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PollService {
  private _apiUrl = 'https://polls2.herokuapp.com/api/v1/polls';

  constructor(private _http: Http) {
  }

  getAll(): Observable<IPoll[]> {
    return this._http.get(this._apiUrl)
      .map((response: Response) => <IPoll[]> response.json().data)
      .catch(this.handleError);
  }

  get(id: string): Observable<IPoll> {
    return this._http.get(`${this._apiUrl}/${id}`)
      .map((response: Response) => <IPoll> response.json().data)
      .catch(this.handleError);
  }

  remove(id: string): Observable<any> {
    return this._http.delete(`${this._apiUrl}/${id}`)
      .map((response: Response) => <any> response.json().data)
      .catch(this.handleError);
  }

  add(poll: IPoll): Observable<IPoll> {
    return this._http.post(this._apiUrl, poll)
      .map((response: Response) => <IPoll> response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
    // return Observable.throw(error.json().error || 'Server error');
  }
}
