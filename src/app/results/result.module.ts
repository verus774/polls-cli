import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultListComponent} from './result-list.component';
import {ResultRoutingModule} from './result-routing.module';
import {ResultDetailComponent} from './result-detail.component';
import {ResultResolver} from './result-resolver.service';
import {ApiService} from '../shared/api.service';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    NgPipesModule,
    ResultRoutingModule
  ],
  declarations: [
    ResultListComponent,
    ResultDetailComponent
  ],
  providers: [
    ApiService,
    ResultResolver
  ]
})

export class ResultModule {
}
