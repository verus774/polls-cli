import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {IResult} from '../result';
import {GroupByPipe, PairsPipe} from 'ngx-pipes';


@Component({
  templateUrl: './result-detail.component.html',
  providers: [
    GroupByPipe,
    PairsPipe
  ]
})

export class ResultDetailComponent implements OnInit {
  result: IResult;
  filteredResults: any [];

  constructor(private _route: ActivatedRoute,
              private _location: Location,
              private _pairsPipe: PairsPipe,
              private _groupByPipe: GroupByPipe) {
  }

  ngOnInit(): void {
    this.result = this._route.snapshot.data['result'];

    /*
        const groupedResult = this._groupByPipe.transform(this.result.results, 'questionText');
        this.filteredResults = this._pairsPipe.transform(groupedResult);
    */

  }

  onBack(): void {
    this._location.back();
  }

}
