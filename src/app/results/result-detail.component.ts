import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ResultService} from './result.service';


@Component({
  templateUrl: 'result-detail.component.html'
})

export class ResultDetailComponent implements OnInit {
  result: any = {};

  constructor(private _resultService: ResultService,
              private _route: ActivatedRoute,
              private _location: Location) {
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.getResult(id);
  }

  private getResult(id: string): void {
    this._resultService.get(id).subscribe(
      result => this.result = result
    );
  }

  onBack(): void {
    this._location.back();
  }

}
