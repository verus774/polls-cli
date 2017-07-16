import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {ApiService} from '../shared/api.service';


@Component({
  templateUrl: 'category-add.component.html'
})

export class CategoryAddComponent implements OnInit {
  id: string;
  category: any = {
    title: '',
    description: ''
  };

  constructor(private _api: ApiService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _notificationsService: NotificationsService) {
  }

  onSubmit(): void {
    if (this.id) {
      this._api.put(`categories/${this.id}`, this.category).subscribe(
        () => {
          this._router.navigate(['/categories']);
          this._notificationsService.success('Categories', 'Category updated');
        },
        () => this._notificationsService.error('Error', 'Fail')
      );
    } else {
      this._api.post('categories', this.category).subscribe(
        () => {
          this._router.navigate(['/categories']);
          this._notificationsService.success('Categories', 'Category added');
        },
        () => this._notificationsService.error('Error', 'Fail')
      );
    }
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');

    if (this.id) {
      this._api.get(`categories/${this.id}`).subscribe(category => this.category = category);
    }
  }

}
