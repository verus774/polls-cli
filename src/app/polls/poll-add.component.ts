import {Component} from '@angular/core';
import {PollService} from './poll.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'poll-add.component.html'
})

export class PollAddComponent {

  constructor(private _pollService: PollService, private _router: Router) {
  }

}
