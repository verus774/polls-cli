import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {IPoll} from './poll';
import {PollService} from './poll.service';
import {NotificationsService} from 'angular2-notifications';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';


@Component({
  templateUrl: 'poll-list.component.html',
  providers: [Modal]
})

export class PollListComponent implements OnInit {
  polls: IPoll[];

  constructor(private _pollService: PollService,
              public modal: Modal,
              vcRef: ViewContainerRef,
              overlay: Overlay,
              private _notificationsService: NotificationsService) {
    overlay.defaultViewContainer = vcRef;
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
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title('Delete poll?')
      .body('Are you sure you want to delete this poll and the related results?')
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._pollService.remove(id).subscribe(
              () => {
                this._notificationsService.success('Polls', 'Poll deleted');
                this.getPolls();
              },
              () => this._notificationsService.error('Error', 'Fail')
            );
          });
      });
  }
}
