import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IPoll} from './poll';
import {Observable} from 'rxjs/Observable';
import {PollService} from './poll.service';

@Injectable()
export class PollResolver implements Resolve<IPoll> {
  constructor(private _pollService: PollService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPoll> {
    const id = route.params['id'];
    return this._pollService.get(id);
  }
}
