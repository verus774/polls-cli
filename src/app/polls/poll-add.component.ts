import {Component} from '@angular/core';
import {PollService} from './poll.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'poll-add.component.html'
})

export class PollAddComponent {

  poll: any = {
    title: '',
    category: '586fdc6e32a6341844ec1036',
    questions: [
      {text: '', choices: ['', '']}
    ]
  };

  constructor(private _pollService: PollService, private _router: Router) {
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
    this._pollService.add(this.poll).subscribe(
      res => this._router.navigate(['/polls']),
      error => console.log(error)
    );
  }

}
