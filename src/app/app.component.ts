import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public options = {
    timeOut: 3000,
  };

  constructor(private _translate: TranslateService) {
  }

  ngOnInit(): void {
    this._translate.setDefaultLang('en');
  }

}
