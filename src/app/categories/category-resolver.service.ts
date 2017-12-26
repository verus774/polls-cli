import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ApiService} from '../shared/api.service';
import {ICategory} from './category';

@Injectable()
export class CategoryResolver implements Resolve<ICategory> {
  constructor(private _api: ApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICategory> {
    const id = route.params['id'];
    return this._api.get(`categories/${id}`).map((res: any) => res.data);
  }
}
