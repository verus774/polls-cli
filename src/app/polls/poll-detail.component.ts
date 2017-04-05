import {Component, OnInit} from '@angular/core';
import {PollService} from './poll.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  templateUrl: 'poll-detail.component.html'
})

export class PollDetailComponent implements OnInit {
  id: string;

  // TODO
  poll: any = {};

  constructor(private _pollService: PollService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.id = _activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._pollService.get(this.id)
      .subscribe(
        poll => this.poll = poll,
        error => console.log(error)
      );
  }

  onBack(): void {
    this._router.navigate(['/polls']);
  }

}
