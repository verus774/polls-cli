import {Component} from '@angular/core';
import {AuthService} from './shared/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from './shared/local-settings.service';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html'
})
export class NavigationComponent {
  constructor(public authService: AuthService,
              private _translate: TranslateService,
              private _localSettings: LocalSettingsService) {
  }

  logout(event: any): void {
    event.preventDefault();
    this.authService.logout();
  }

  changeLanguage(event: any, language: string): void {
    event.preventDefault();
    this._localSettings.setLanguage(language);
    this._translate.use(language);
  }
}
