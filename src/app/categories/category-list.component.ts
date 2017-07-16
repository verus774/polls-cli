import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ICategory} from './category';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../shared/api.service';

@Component({
  templateUrl: 'category-list.component.html',
  providers: [Modal]
})

export class CategoryListComponent implements OnInit {
  categories: ICategory[];

  constructor(private _api: ApiService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this._api.get('categories').subscribe(categories => this.categories = categories);
  }

  removeCategory(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title('Delete category?')
      .body('Are you sure you want to delete this category?')
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._api.delete(`categories/${id}`).subscribe(
              () => {
                this._notificationsService.success('Categories', 'Category deleted');
                this.getCategories();
              },
              () => this._notificationsService.error('Error', 'Fail')
            );
          });
      });
  }
}
