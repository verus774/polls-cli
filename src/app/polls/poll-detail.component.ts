import {Component, OnInit} from '@angular/core';
import {PollService} from './poll.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'poll-detail.component.html'
})

export class PollDetailComponent implements OnInit {
  private id: string;
  private sub: Subscription;

  // TODO
  poll: any = {};

  constructor(private _pollService: PollService,
              private _route: ActivatedRoute,
              private _location: Location) {
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.getPoll(id);
  }

  getPoll(id: string): void {
    this._pollService.get(id).subscribe(
      poll => this.poll = poll,
      error => console.log(error)
    );
  }

  onBack(): void {
    this._location.back();
  }

}
