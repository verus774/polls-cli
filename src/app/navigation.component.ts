import {Component} from '@angular/core';
import {AuthService} from './shared/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html'
})
export class NavigationComponent {
  constructor(public authService: AuthService) {
  }

  logout(event: any): void {
    event.preventDefault();
    this.authService.logout();
  }
}
