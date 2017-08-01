import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from './shared/local-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public options = {
    timeOut: 3000,
  };

  constructor(private _translate: TranslateService,
              private _localSettings: LocalSettingsService) {
  }

  ngOnInit(): void {
    this._translate.setDefaultLang('en');

    const storedLang = this._localSettings.getLanguage();
    if (storedLang !== '') {
      this._translate.use(storedLang);
    }

  }

}
