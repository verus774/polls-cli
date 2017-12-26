import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ApiService} from '../shared/api.service';
import {IUser} from './user';

@Injectable()
export class UserResolver implements Resolve<IUser> {
  constructor(private _api: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    const id = route.params['id'];
    return this._api.get(`users/${id}`).map((res: any) => res.data);
  }
}
