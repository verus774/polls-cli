import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {CategoryService} from './category.service';
import {ICategory} from './category';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';

@Component({
  templateUrl: 'category-list.component.html',
  providers: [Modal]
})

export class CategoryListComponent implements OnInit {
  categories: ICategory[];

  constructor(private _categoryService: CategoryService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this._categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
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
            this._categoryService.remove(id).subscribe(
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
