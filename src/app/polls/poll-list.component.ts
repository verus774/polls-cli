import {Component, OnInit} from '@angular/core';
import {IPoll} from './poll';
import {PollService} from './poll.service';
import {NotificationsService} from 'angular2-notifications';


@Component({
  templateUrl: 'poll-list.component.html'
})

export class PollListComponent implements OnInit {
  polls: IPoll[];

  constructor(private _pollService: PollService, private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.getPolls();
  }

  getPolls(): void {
    this._pollService.getAll().subscribe(
      polls => this.polls = polls,
      error => console.log(error)
    );

  }

  removePoll(id: string): void {
    this._notificationsService.success('Polls', 'Poll deleted');
  }
}
