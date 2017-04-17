import {Component, OnDestroy, OnInit} from '@angular/core';
import {PollService} from './poll.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';


@Component({
  templateUrl: 'poll-detail.component.html'
})

export class PollDetailComponent implements OnInit, OnDestroy {
  private id: string;
  private sub: Subscription;

  // TODO
  poll: any = {};

  constructor(private _pollService: PollService,
              private _route: ActivatedRoute,
              private _location: Location) {
    this.id = _route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPoll(this.id);

    /*this.sub = this._route.params.subscribe(
     params => this.getPoll(params['id'])
     );*/

    /*const id = this._route.snapshot.paramMap.get('id');
     this.getPoll(id);*/

    /*this._route.paramMap
     .map((params: ParamMap) => params.get('id'))
     .switchMap(id => this._pollService.get(id))
     .subscribe(poll => this.poll = poll);*/
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
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
