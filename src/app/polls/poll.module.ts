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
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {QRCodeModule} from 'angular2-qrcode';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    NgPipesModule,
    PollRoutingModule,
    NgxPaginationModule,
    NgxChartsModule,
    QRCodeModule
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
