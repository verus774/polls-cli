import {NgModule} from '@angular/core';
import {PollRoutingModule} from './poll-routing.module';
import {PollListComponent} from './poll-list.component';
import {PollDetailComponent} from './poll-detail.component';
import {PollAddComponent} from './poll-add.component';
import {FormsModule} from '@angular/forms';
import {PollResolver} from './poll-resolver.service';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    NgPipesModule,
    PollRoutingModule
  ],
  declarations: [
    PollListComponent,
    PollDetailComponent,
    PollAddComponent
  ],
  providers: [
    PollResolver,
    ApiService
  ]
})

export class PollModule {
}
