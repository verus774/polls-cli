import {NgModule} from '@angular/core';
import {PollRoutingModule} from './poll-routing.module';
import {PollListComponent} from './poll-list.component';
import {PollDetailComponent} from './poll-detail.component';
import {PollAddComponent} from './poll-add.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PollResolver} from './poll-resolver.service';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    PollRoutingModule,
    TranslateModule
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
