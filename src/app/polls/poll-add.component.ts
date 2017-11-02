import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {ICategory} from '../categories/category';
import {ApiService} from '../shared/api.service';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';


@Component({
  templateUrl: 'poll-add.component.html'
})

export class PollAddComponent implements OnInit {
  poll: any = {
    title: '',
    category: {
      _id: ''
    },
    questions: [
      {text: '', choices: ['', '']}
    ]
  };
  categories: ICategory[];

  constructor(private _api: ApiService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _translate: TranslateService,
              private _notificationsService: NotificationsService) {
  }

  addQuestion(): void {
    this.poll.questions.push(
      {text: '', choices: ['', '']}
    );
  }

  removeQuestion(index: number): void {
    this.poll.questions.splice(index, 1);
  }

  addChoice(questionIndex: number): void {
    this.poll.questions[questionIndex].choices.push('');
  }

  removeChoice(questionIndex: number, choiceIndex: number): void {
    this.poll.questions[questionIndex].choices.splice(choiceIndex, 1);
  }

  trackByFn(index, item) {
    return index;
  }

  onSubmit(): void {
    if (this.poll._id) {
      this._api.put(`polls/${this.poll._id}`, this.poll).subscribe(
        () => {
          this._router.navigate(['/polls']);
          this._notificationsService.success(
            this._translate.instant('POLL_ADD.NOTIFICATION_TITLE'),
            this._translate.instant('POLL_ADD.NOTIFICATION_UPDATED')
          );
        },
        () => this._notificationsService.error(
          this._translate.instant('NOTIFICATION_ERR.TITLE'),
          this._translate.instant('NOTIFICATION_ERR.CONTENT')
        )
      );
    } else {
      this._api.post('polls', this.poll).subscribe(
        () => {
          this._router.navigate(['/polls']);
          this._notificationsService.success(
            this._translate.instant('POLL_ADD.NOTIFICATION_TITLE'),
            this._translate.instant('POLL_ADD.NOTIFICATION_ADDED')
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
    this.getCategories();

    const poll = this._route.snapshot.data['poll'];
    if (poll) {
      this.poll = poll;
    }
  }

  private getCategories(): void {
    this._api.get('categories').map((res: any) => res.data).subscribe(categories => this.categories = categories);
  }

  onReset(form: NgForm): void {
    form.reset();
  }
}
