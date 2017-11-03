import {NgModule} from '@angular/core';
import {PollRoutingModule} from './poll-routing.module';
import {PollListComponent} from './poll-list/poll-list.component';
import {PollDetailComponent} from './poll-detail/poll-detail.component';
import {PollAddComponent} from './poll-add/poll-add.component';
import {FormsModule} from '@angular/forms';
import {PollResolver} from './poll-resolver.service';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';
import {SharedModule} from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {AnswersChartComponent} from './answers-chart/answers-chart.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    NgPipesModule,
    PollRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    PollListComponent,
    PollDetailComponent,
    PollAddComponent,
    AnswersChartComponent
  ],
  providers: [
    PollResolver,
    ApiService
  ]
})

export class PollModule {
}
