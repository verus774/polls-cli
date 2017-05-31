import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {NotificationsService} from 'angular2-notifications';
import {IResult} from './result';
import {ResultService} from './result.service';

@Component({
  templateUrl: 'result-list.component.html',
  providers: [Modal]
})

export class ResultListComponent implements OnInit {
  results: IResult[];

  constructor(private _resultService: ResultService,
              public modal: Modal,
              public vcRef: ViewContainerRef,
              public overlay: Overlay,
              private _notificationsService: NotificationsService) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.getResults();
  }

  private getResults(): void {
    this._resultService.getAll().subscribe(
      results => this.results = results
    );
  }

  removeResult(id: string): void {
    this.modal.confirm()
      .isBlocking(false)
      .keyboard(27)
      .title('Delete result?')
      .body('Are you sure you want to delete this result?')
      .open()
      .then((res) => {
        res.result
          .then(() => {
            this._resultService.remove(id).subscribe(
              () => {
                this._notificationsService.success('Results', 'Result deleted');
                this.getResults();
              },
              () => this._notificationsService.error('Error', 'Fail')
            );
          });
      });
  }

}
