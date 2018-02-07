import {Component} from '@angular/core';
import {ApiService} from '../../api.service';
import {NgForm} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent {

  constructor(private _api: ApiService,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  onSubmit(event: any, form: NgForm): void {
    event.preventDefault();

    const {name, email, text} = form.value;
    const message = `
<b>Name: </b>${name}
<b>Email: </b>${email}
<b>Text: </b>${text}
`;

    this._api.post('/telegram', {text: message}).subscribe(
      () => {
        form.reset();
        this._notificationsService.success(
          this._translate.instant('CONTACT.NOTIFICATION_TITLE'),
          this._translate.instant('CONTACT.NOTIFICATION_SENT')
        );
      },
      () => {
        this._notificationsService.error(
          this._translate.instant('NOTIFICATION_ERR.TITLE'),
          this._translate.instant('NOTIFICATION_ERR.CONTENT')
        );
      }
    );
  }

}
