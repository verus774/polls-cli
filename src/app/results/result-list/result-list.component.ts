import {Component, OnInit} from '@angular/core';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {IResult} from '../result';
import {ApiService} from '../../shared/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './result-list.component.html'
})

export class ResultListComponent implements OnInit {
  results: IResult[];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private _api: ApiService,
              public modal: Modal,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getResults();
  }

  getResults(page = this.currentPage): void {
    this._api.get(`results?page=${page}&limit=${this.itemsPerPage}`)
      .subscribe(res => {
        this.results = res.data;
        this.totalItems = res.meta.paging.total;
        this.currentPage = page;
      });
  }

  removeResult(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title(this._translate.instant('RESULT_LIST.MODAL_DELETE_TITLE'))
      .body(this._translate.instant('RESULT_LIST.MODAL_DELETE_BODY'))
      .open()
      .result
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
  }

}
