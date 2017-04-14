import {Component, OnInit} from '@angular/core';
import {PollService} from './poll.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications/dist';


@Component({
  templateUrl: 'poll-add.component.html'
})

export class PollAddComponent implements OnInit {
  id: string;
  poll: any = {
    title: '',
    category: '586fdc6e32a6341844ec1036',
    questions: [
      {text: '', choices: ['', '']}
    ]
  };

  constructor(private _pollService: PollService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _notificationsService: NotificationsService) {
    this.id = _activatedRoute.snapshot.params['id'];
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
    if (this.id) {
      this._pollService.get(this.id)
        .subscribe(
          poll => this.poll = poll,
          error => console.log(error)
        );
    }
  }

}
