import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ICategory} from '../category';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../../shared/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './category-list.component.html',
  providers: [Modal]
})

export class CategoryListComponent implements OnInit {
  categories: ICategory[];

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(page = this.currentPage): void {
    this._api.get(`categories?page=${page}&limit=${this.itemsPerPage}`)
      .subscribe(res => {
        this.categories = res.data;
        this.totalItems = res.meta.paging.total;
        this.currentPage = page;
      });
  }

  removeCategory(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title(this._translate.instant('CAT_LIST.MODAL_DELETE_TITLE'))
      .body(this._translate.instant('CAT_LIST.MODAL_DELETE_BODY'))
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`categories/${id}`).subscribe(
              () => {
                this._notificationsService.success(
                  this._translate.instant('CAT_LIST.NOTIFICATION_TITLE'),
                  this._translate.instant('CAT_LIST.NOTIFICATION_DELETED')
                );
                this.getCategories();
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
