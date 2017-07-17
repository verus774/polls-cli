import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {IResult} from './result';


@Component({
  templateUrl: 'result-detail.component.html'
})

export class ResultDetailComponent implements OnInit {
  result: IResult;

  constructor(private _route: ActivatedRoute, private _location: Location) {
  }

  ngOnInit(): void {
    this.result = this._route.snapshot.data['result'];
  }

  onBack(): void {
    this._location.back();
  }

}
