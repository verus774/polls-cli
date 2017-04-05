import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public options = {
    timeOut: 1000,
  };

  constructor(private _authService: AuthService) {
  }

}
