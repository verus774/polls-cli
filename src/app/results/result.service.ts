import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {IResult} from './result';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ResultService {
  private _apiUrl = 'https://polls2.herokuapp.com/api/v1/results';

  constructor(private _http: Http) {
  }

  getAll(): Observable<IResult[]> {
    return this._http.get(this._apiUrl)
      .map((response: Response) => <IResult[]> response.json().data)
      .catch(this.handleError);
  }

  get(id: string): Observable<IResult> {
    return this._http.get(`${this._apiUrl}/${id}`)
      .map((response: Response) => <IResult> response.json().data)
      .catch(this.handleError);
  }

  remove(id: string): Observable<any> {
    return this._http.delete(`${this._apiUrl}/${id}`)
      .map((response: Response) => <any> response.json().data)
      .catch(this.handleError);
  }

  add(category: IResult): Observable<IResult> {
    return this._http.post(this._apiUrl, category)
      .map((response: Response) => <IResult> response.json().data)
      .catch(this.handleError);
  }

  update(category: IResult): Observable<IResult> {
    return this._http.put(`${this._apiUrl}/${category._id}`, category)
      .map((response: Response) => <IResult> response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
}
