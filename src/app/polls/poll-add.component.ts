import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {ICategory} from '../categories/category';
import {ApiService} from '../shared/api.service';


@Component({
  templateUrl: 'poll-add.component.html'
})

export class PollAddComponent implements OnInit {
  id: string;
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
    if (this.id) {
      this._api.put(`polls/${this.id}`, this.poll).subscribe(
        () => {
          this._router.navigate(['/polls']);
          this._notificationsService.success('Polls', 'Poll updated');
        },
        () => this._notificationsService.error('Error', 'Fail')
      );
    } else {
      this._api.post('polls', this.poll).subscribe(
        () => {
          this._router.navigate(['/polls']);
          this._notificationsService.success('Polls', 'Poll added');
        },
        () => this._notificationsService.error('Error', 'Fail')
      );
    }
  }

  ngOnInit(): void {
    this.getCategories();

    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._api.get(`polls/${this.id}`).subscribe(poll => this.poll = poll);
    }
  }

  private getCategories(): void {
    this._api.get('categories').subscribe(categories => this.categories = categories);
  }
}
