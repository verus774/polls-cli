import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
  user: any = {};

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    this._authService.logout();
  }

  signup(event: any): void {
    event.preventDefault();

    this._authService.signup(this.user.username, this.user.name, this.user.password)
      .subscribe(
        res => this._router.navigate(['/polls']),
        err => this._router.navigate(['/signup'])
      );

  }
}
