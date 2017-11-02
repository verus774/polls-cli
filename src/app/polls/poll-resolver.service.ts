import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IPoll} from './poll';
import {Observable} from 'rxjs/Observable';
import {ApiService} from '../shared/api.service';

@Injectable()
export class PollResolver implements Resolve<IPoll> {
  constructor(private _api: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPoll> {
    const id = route.params['id'];
    return this._api.get(`polls/${id}`).map((res: any) => res.data);
  }
}
