import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
  user: any = {};

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/polls']);
    }
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
