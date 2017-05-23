import {Component, OnInit} from '@angular/core';
import {PollService} from './poll.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {CategoryService} from '../categories/category.service';
import {ICategory} from '../categories/category';


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

  constructor(private _pollService: PollService,
              private _categoryService: CategoryService,
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
      this._pollService.update(this.poll).subscribe(
        () => {
          this._router.navigate(['/polls']);
          this._notificationsService.success('Polls', 'Poll updated');
        },
        () => this._notificationsService.error('Error', 'Fail')
      );
    } else {
      this._pollService.add(this.poll).subscribe(
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
      this.getPoll(this.id);
    }
  }

  private getCategories(): void {
    this._categoryService.getAll().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }

  private getPoll(id: string): void {
    this._pollService.get(id)
      .subscribe(
        poll => {
          this.poll = poll;
        }
      );
  }

}
