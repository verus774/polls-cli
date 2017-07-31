import {Component} from '@angular/core';
import {AuthService} from './shared/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html'
})
export class NavigationComponent {
  constructor(public authService: AuthService, private _translate: TranslateService) {
  }

  logout(event: any): void {
    event.preventDefault();
    this.authService.logout();
  }

  changeLanguage(event: any, language: string): void {
    event.preventDefault();
    this._translate.use(language);
  }
}
