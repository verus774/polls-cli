import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {IResult} from './result';
import {ResultService} from './result.service';

@Injectable()
export class ResultResolver implements Resolve<IResult> {
  constructor(private _resultService: ResultService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResult> {
    const id = route.params['id'];
    return this._resultService.get(id);
  }
}
