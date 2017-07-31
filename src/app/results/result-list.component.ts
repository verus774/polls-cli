import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {IResult} from './result';
import {ApiService} from '../shared/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: 'result-list.component.html',
  providers: [Modal]
})

export class ResultListComponent implements OnInit {
  results: IResult[];

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getResults();
  }

  private getResults(): void {
    this._api.get('results').subscribe(results => this.results = results);
  }

  removeResult(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title('Delete result?')
      .body('Are you sure you want to delete this result?')
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`results/${id}`).subscribe(
              () => {
                this._notificationsService.success(
                  this._translate.instant('RESULT_LIST.NOTIFICATION_TITLE'),
                  this._translate.instant('RESULT_LIST.NOTIFICATION_DELETED')
                );
                this.getResults();
              },
              () => this._notificationsService.error(
                this._translate.instant('NOTIFICATION_ERR.TITLE'),
                this._translate.instant('NOTIFICATION_ERR.CONTENT')
              )
            );
          });
      });
  }

}
