import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../../shared/api.service';
import {ICategory} from '../category';
import {TranslateService} from '@ngx-translate/core';


@Component({
  templateUrl: './category-add.component.html'
})

export class CategoryAddComponent implements OnInit {
  category: ICategory = {
    title: '',
    description: ''
  };

  constructor(private _api: ApiService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  onSubmit(): void {
    if (this.category._id) {
      this._api.put(`categories/${this.category._id}`, this.category).subscribe(
        () => {
          this._router.navigate(['/categories']);
          this._notificationsService.success(
            this._translate.instant('CAT_ADD.NOTIFICATION_TITLE'),
            this._translate.instant('CAT_ADD.NOTIFICATION_UPDATED')
          );
        },
        () => this._notificationsService.error(
          this._translate.instant('NOTIFICATION_ERR.TITLE'),
          this._translate.instant('NOTIFICATION_ERR.CONTENT')
        )
      );
    } else {
      this._api.post('categories', this.category).subscribe(
        () => {
          this._router.navigate(['/categories']);
          this._notificationsService.success(
            this._translate.instant('CAT_ADD.NOTIFICATION_TITLE'),
            this._translate.instant('CAT_ADD.NOTIFICATION_ADDED')
          );
        },
        () => this._notificationsService.error(
          this._translate.instant('NOTIFICATION_ERR.TITLE'),
          this._translate.instant('NOTIFICATION_ERR.CONTENT')
        )
      );
    }
  }

  ngOnInit(): void {
    const category = this._route.snapshot.data['category'];
    if (category) {
      this.category = category;
    }
  }

}
