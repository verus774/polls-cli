import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ApiService} from '../shared/api.service';
import {IRoom} from './room';

@Injectable()
export class RoomResolver implements Resolve<IRoom> {
  constructor(private _api: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRoom> {
    const id = route.params['id'];
    return this._api.get(`rooms/${id}`).map((res: any) => res.data);
  }
}
