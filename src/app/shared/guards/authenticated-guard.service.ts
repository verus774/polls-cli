import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(): boolean {
    if (!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
