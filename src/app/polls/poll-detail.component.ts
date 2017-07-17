import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {IPoll} from './poll';

@Component({
  templateUrl: 'poll-detail.component.html'
})

export class PollDetailComponent implements OnInit {
  poll: IPoll;

  constructor(private _route: ActivatedRoute, private _location: Location) {
  }

  ngOnInit(): void {
    this.poll = this._route.snapshot.data['poll'];
  }

  onBack(): void {
    this._location.back();
  }

}
