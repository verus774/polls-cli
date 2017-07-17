import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  user: any = {};

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/polls']);
    }
  }

  login(event: any): void {
    event.preventDefault();

    this._authService.login(this.user.username, this.user.password)
      .subscribe(
        res => this._router.navigate(['/polls']),
        err => this._router.navigate(['/'])
      );

  }
}
