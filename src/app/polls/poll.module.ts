import {NgModule} from '@angular/core';
import {PollRoutingModule} from './poll-routing.module';
import {PollListComponent} from './poll-list.component';
import {PollDetailComponent} from './poll-detail.component';
import {PollAddComponent} from './poll-add.component';
import {PollService} from './poll.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PollResolver} from './poll-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PollRoutingModule
  ],
  declarations: [
    PollListComponent,
    PollDetailComponent,
    PollAddComponent
  ],
  providers: [
    PollService,
    PollResolver
  ]
})

export class PollModule {
}
