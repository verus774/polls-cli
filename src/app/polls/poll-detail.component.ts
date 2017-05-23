import {Component, OnInit} from '@angular/core';
import {PollService} from './poll.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'poll-detail.component.html'
})

export class PollDetailComponent implements OnInit {
  poll: any = {};

  constructor(private _pollService: PollService,
              private _route: ActivatedRoute,
              private _location: Location) {
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.getPoll(id);
  }

  private getPoll(id: string): void {
    this._pollService.get(id).subscribe(
      poll => this.poll = poll
    );
  }

  onBack(): void {
    this._location.back();
  }

}
