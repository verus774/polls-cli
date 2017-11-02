import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {IResult} from './result';
import {ApiService} from '../shared/api.service';

@Injectable()
export class ResultResolver implements Resolve<IResult> {
  constructor(private _api: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResult> {
    const id = route.params['id'];
    return this._api.get(`results/${id}`).map((res: any) => res.data);
  }
}
